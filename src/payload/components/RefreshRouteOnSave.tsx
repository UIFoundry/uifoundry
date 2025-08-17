"use client";

import { RefreshRouteOnSave as PayloadLivePreview } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation.js";
import React, { useEffect, useRef } from "react";
import { env } from "~/env.mjs";

export default function RefreshRouteOnSave() {
  const router = useRouter();

  const lastTimestamp = useRef<number>(0);

  useEffect(() => {
    function handleStorageChange(e: StorageEvent) {
      if (e.key === "uifoundry-refresh" && e.newValue) {
        const timestamp = parseInt(e.newValue);
        if (timestamp > lastTimestamp.current) {
          lastTimestamp.current = timestamp;
          window.location.reload();
        }
      }
    }

    // Listen for storage events from other windows/tabs
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <PayloadLivePreview
      refresh={() => router.refresh()}
      serverURL={env.NEXT_PUBLIC_BETTER_AUTH_URL}
    />
  );
}
