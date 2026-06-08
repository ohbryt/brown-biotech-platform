/**
 * Streaming FASTQ parser — pure TS, browser-side.
 *
 * Supports .fastq (plain) and .fastq.gz (gzipped) via the browser-native
 * DecompressionStream API. Yields records as { id, seq, qual, length }.
 *
 * Designed for GB-scale files: chunks the input via a TextDecoderStream
 * and parses 4-line records incrementally. No full-file load.
 */
export interface FastqRecord {
  id: string;
  seq: string;
  qual: string;
  length: number;
}

export interface FastqSourceOptions {
  /** Hard cap on records yielded (for v1 browser-demo performance). */
  maxRecords?: number;
  /** Skip every N records (uniform subsampling). */
  subsampleEveryN?: number;
}

function isGzipFile(file: File | Blob): boolean {
  const name = (file as File).name?.toLowerCase?.() ?? "";
  if (name.endsWith(".gz") || name.endsWith(".bgz")) return true;
  return false;
}

/**
 * Iterate FASTQ records from a File or Blob.
 * Browser-only: uses ReadableStream + TextDecoderStream.
 */
export async function* iterateFastq(
  file: File | Blob,
  opts: FastqSourceOptions = {}
): AsyncGenerator<FastqRecord> {
  const { maxRecords = 200_000, subsampleEveryN = 1 } = opts;
  const stream = file.stream();
  const decoded = stream.pipeThrough(new TextDecoderStream("utf-8"));

  let buffer = "";
  let lineIndex = 0; // 0=id, 1=seq, 2=plus, 3=qual
  let pendingId = "";
  let pendingSeq = "";
  let pendingPlus = "";
  let pendingQual = "";
  let yielded = 0;
  let seen = 0;

  for await (const chunk of decoded.values()) {
    buffer += chunk;
    let nl: number;
    while ((nl = buffer.indexOf("\n")) !== -1) {
      let line = buffer.slice(0, nl);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      buffer = buffer.slice(nl + 1);
      if (line.length === 0) {
        lineIndex = 0;
        continue;
      }
      if (lineIndex === 0) {
        // id line — must start with '@'
        if (line.startsWith("@")) {
          pendingId = line.slice(1).split(/\s/)[0];
        } else {
          // malformed; reset
          pendingId = "";
        }
      } else if (lineIndex === 1) {
        pendingSeq = line;
      } else if (lineIndex === 2) {
        // + line (optional description)
        pendingPlus = line;
      } else if (lineIndex === 3) {
        pendingQual = line;
        if (pendingId && pendingSeq) {
          seen++;
          if (subsampleEveryN <= 1 || seen % subsampleEveryN === 0) {
            yield {
              id: pendingId,
              seq: pendingSeq,
              qual: pendingQual,
              length: pendingSeq.length,
            };
            yielded++;
            if (yielded >= maxRecords) return;
          }
        }
        pendingId = "";
        pendingSeq = "";
        pendingPlus = "";
        pendingQual = "";
      }
      lineIndex = (lineIndex + 1) % 4;
    }
  }

  // Flush any trailing partial record
  if (lineIndex === 3 && pendingId && pendingSeq) {
    seen++;
    if (subsampleEveryN <= 1 || seen % subsampleEveryN === 0) {
      yield {
        id: pendingId,
        seq: pendingSeq,
        qual: pendingQual,
        length: pendingSeq.length,
      };
    }
  }
}

/** Get a streaming source that handles .gz transparently. */
export function fastqStream(file: File | Blob): ReadableStream<Uint8Array> {
  const raw = file.stream();
  if (!isGzipFile(file)) return raw;
  // @ts-expect-error DecompressionStream is available in modern browsers
  // and Node 18+. If absent, the caller should disable .gz uploads.
  return raw.pipeThrough(new DecompressionStream("gzip"));
}

/** True if the file extension suggests gzip. */
export { isGzipFile };
