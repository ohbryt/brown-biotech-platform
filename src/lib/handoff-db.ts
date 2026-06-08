/**
 * Cross-page file handoff via IndexedDB.
 *
 * Why IndexedDB and not sessionStorage:
 *   - sessionStorage is ~5 MB across all keys. A 4,000-read FASTQ is ~0.7 MB
 *     plain text, but gzipped or larger samples easily exceed 5 MB.
 *   - Blob URLs (URL.createObjectURL) are revoked when the document that
 *     created them unloads, so they cannot cross a navigation.
 *   - IndexedDB stores File/Blob natively, has multi-MB-to-GB quotas, and
 *     persists across same-origin navigations.
 *
 * The handoff is single-use: `consumeStash` deletes the record after read.
 * Stale records older than `STALE_MS` are GC'd on every new stash so a
 * user who navigates back without consuming doesn't leak storage.
 */

const DB_NAME = "bb-handoff";
const STORE = "fastq-handoff";
const VERSION = 1;
const STALE_MS = 1000 * 60 * 30; // 30 minutes

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB not available"));
      return;
    }
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error("IndexedDB open failed"));
  });
}

async function gcStale(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE, "readwrite");
      const store = tx.objectStore(STORE);
      const req = store.getAll();
      req.onsuccess = () => {
        const cutoff = Date.now() - STALE_MS;
        const all = (req.result ?? []) as Array<{
          id: string;
          createdAt: number;
        }>;
        for (const row of all) {
          if (typeof row.createdAt === "number" && row.createdAt < cutoff) {
            store.delete(row.id);
          }
        }
      };
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
      tx.onabort = () => resolve();
    });
  } catch {
    // best-effort GC; never throw from the handoff path
  }
}

export async function stashFile(file: File): Promise<string> {
  await gcStale();
  const uuid = crypto.randomUUID();
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put({
      id: uuid,
      file,
      name: file.name,
      type: file.type || "application/octet-stream",
      createdAt: Date.now(),
    });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error || new Error("IndexedDB write failed"));
    tx.onabort = () => reject(tx.error || new Error("IndexedDB write aborted"));
  });
  return uuid;
}

export async function consumeStash(uuid: string): Promise<File | null> {
  const db = await openDB();
  return new Promise<File | null>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    const req = store.get(uuid);
    req.onsuccess = () => {
      const data = req.result as
        | { id: string; file: Blob; name: string; type: string }
        | undefined;
      if (!data) {
        resolve(null);
        return;
      }
      const file = new File([data.file], data.name, { type: data.type });
      // single-use: delete after read
      try {
        store.delete(uuid);
      } catch {
        // ignore
      }
      resolve(file);
    };
    req.onerror = () => reject(req.error || new Error("IndexedDB read failed"));
    tx.onerror = () => reject(tx.error || new Error("IndexedDB tx failed"));
  });
}

export function isFastqFile(name: string): boolean {
  return /\.(fastq|fq)(\.gz)?$/i.test(name);
}
