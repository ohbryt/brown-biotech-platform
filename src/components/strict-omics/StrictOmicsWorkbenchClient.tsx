"use client";

import { useEffect, useState } from "react";
import StrictOmicsWorkbench from "./StrictOmicsWorkbench";
import { consumeStash } from "@/lib/handoff-db";

/**
 * Client wrapper for <StrictOmicsWorkbench> that handles cross-page handoff.
 *
 * Reads ?preload=<uuid>&autoRun=1 from the URL, fetches the stashed file
 * from IndexedDB, and forwards the file + autoRun flag to the workbench.
 *
 * The workbench itself stays pure (no URL knowledge) so it can also be
 * embedded in non-page contexts (e.g. an internal demo route).
 */
export default function StrictOmicsWorkbenchClient() {
  const [preloadUuid, setPreloadUuid] = useState<string | null>(null);
  const [autoRun, setAutoRun] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const uuid = params.get("preload");
    const run = params.get("autoRun") === "1";
    setPreloadUuid(uuid);
    setAutoRun(run);
    setHydrated(true);
    // Clean the URL so a refresh doesn't re-trigger the handoff
    if (uuid) {
      const url = new URL(window.location.href);
      url.searchParams.delete("preload");
      url.searchParams.delete("autoRun");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  if (!hydrated) {
    // Avoid a flash where the workbench mounts and then a file appears
    return null;
  }

  return (
    <StrictOmicsWorkbench
      preloadUuid={preloadUuid}
      autoRun={autoRun}
      onPreloadConsumed={consumeStash}
    />
  );
}
