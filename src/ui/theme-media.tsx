"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

interface ThemeMediaProps extends Omit<ImageProps, "src"> {
  lightSrc?: string | null;
  darkSrc?: string | null;
}

export default function ThemeMedia({
  lightSrc,
  darkSrc,
  alt,
  ...props
}: ThemeMediaProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setIsDark(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const src = isDark ? (darkSrc ?? lightSrc) : (lightSrc ?? darkSrc);

  if (!src) return null;

  return <Image src={src} alt={alt ?? ""} {...props} />;
}
