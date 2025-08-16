"use client";

import type { ComponentPropsWithRef } from "react";
import { useEffect, useState } from "react";

export default function HeaderSpacing({
  showHeader,
  children,
  ...divProps
}: { showHeader: boolean } & ComponentPropsWithRef<"div">) {
  const [headerHeight, setHeaderHeight] = useState(showHeader ? 64 : 0); // Default height to prevent layout shift

  useEffect(() => {
    if (!showHeader) return;

    const updateHeaderHeight = () => {
      const header = document.getElementById("header");
      if (header) {
        const height = header.getBoundingClientRect().height;
        setHeaderHeight(height);
      }
    };

    // Initial measurement
    updateHeaderHeight();

    // Handle resize events
    const handleResize = () => updateHeaderHeight();
    window.addEventListener("resize", handleResize);

    // Use ResizeObserver for more accurate header size changes
    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    const header = document.getElementById("header");
    if (header) {
      resizeObserver.observe(header);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
    };
  }, [showHeader]);

  if (!showHeader) {
    return children;
  }

  return (
    <div style={{ paddingTop: headerHeight }} {...divProps}>
      {children}
    </div>
  );
}
