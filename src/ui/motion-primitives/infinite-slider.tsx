"use client";

import { cn } from "~/styles/utils";
import { useMotionValue, animate, motion } from "motion/react";
import { useState, useEffect } from "react";
import useMeasure from "react-use-measure";

export type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  speed?: number; // pixels per second
  pauseOnHover?: boolean;
  // orientation (alias both for compatibility)
  axis?: "horizontal" | "vertical";
  direction?: "horizontal" | "vertical";
  // direction of travel
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  pauseOnHover,
  axis,
  direction,
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [paused, setPaused] = useState(false);

  const orientation = axis ?? direction ?? "horizontal";

  useEffect(() => {
    const totalSize = orientation === "horizontal" ? width : height; // size of two copies + one gap
    if (!totalSize) return;

    const singleSize = Math.max(1, (totalSize - gap) / 2); // size of one copy
    const distance = singleSize + gap; // distance to move per loop
    const from = reverse ? -distance : 0;
    const to = reverse ? 0 : -distance;

    // Ensure we start within bounds to avoid jumps
    const current = translation.get();
    if (current < Math.min(from, to) || current > Math.max(from, to)) {
      translation.set(from);
    }

    const duration = Math.max(0.001, Math.abs(to - from) / speed);

    const controls = animate(translation, [from, to], {
      ease: "linear",
      duration,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
      onRepeat: () => translation.set(from),
    });

    if (paused) controls.stop();

    return () => controls.stop();
  }, [orientation, reverse, gap, speed, width, height, paused, translation]);

  const hoverProps = pauseOnHover
    ? {
        onHoverStart: () => setPaused(true),
        onHoverEnd: () => setPaused(false),
      }
    : {};

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        className="flex w-max"
        style={{
          ...(orientation === "horizontal"
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: orientation === "horizontal" ? "row" : "column",
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
