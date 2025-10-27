"use client";

import { type HTMLMotionProps, motion } from "motion/react";

import { cn } from "~/styles/utils";

export const GRADIENT_ANGLES = {
  bottom: 180,
  left: 270,
  right: 90,
  top: 0,
};

export type ProgressiveBlurProps = HTMLMotionProps<"div"> & {
  blurIntensity?: number;
  blurLayers?: number;
  className?: string;
  direction?: keyof typeof GRADIENT_ANGLES;
};

export function ProgressiveBlur({
  blurIntensity = 0.25,
  blurLayers = 8,
  className,
  direction = "bottom",
  ...props
}: ProgressiveBlurProps) {
  const layers = Math.max(blurLayers, 2);
  const segmentSize = 1 / (blurLayers + 1);

  return (
    <div className={cn("relative", className)}>
      {Array.from({ length: layers }).map((_, index) => {
        const angle = GRADIENT_ANGLES[direction];
        const gradientStops = [
          index * segmentSize,
          (index + 1) * segmentSize,
          (index + 2) * segmentSize,
          (index + 3) * segmentSize,
        ].map(
          (pos, posIndex) =>
            `rgba(255, 255, 255, ${posIndex === 1 || posIndex === 2 ? 1 : 0}) ${pos * 100}%`,
        );

        const gradient = `linear-gradient(${angle}deg, ${gradientStops.join(", ")})`;

        return (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            key={index}
            style={{
              backdropFilter: `blur(${index * blurIntensity}px)`,
              maskImage: gradient,
              WebkitMaskImage: gradient,
            }}
            {...props}
          />
        );
      })}
    </div>
  );
}
