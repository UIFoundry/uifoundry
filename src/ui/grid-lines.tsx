import { twMerge } from "tailwind-merge"

interface GridLinesProps extends Omit<React.ComponentProps<"svg">, "height" | "width"> {
  height?: number
  mask?:
    | "bottom"
    | "bottom_left"
    | "bottom_right"
    | "left"
    | "none"
    | "right"
    | "top"
    | "top_left"
    | "top_right"
  width?: number
}

const maskMap: Record<Exclude<GridLinesProps["mask"], undefined>, string> = {
  bottom: "[mask-image:radial-gradient(100%_100%_at_bottom,white,transparent)]",
  bottom_left: "[mask-image:radial-gradient(100%_100%_at_bottom_left,white,transparent)]",
  bottom_right: "[mask-image:radial-gradient(100%_100%_at_bottom_right,white,transparent)]",
  left: "[mask-image:radial-gradient(100%_100%_at_left,white,transparent)]",
  none: "",
  right: "[mask-image:radial-gradient(100%_100%_at_right,white,transparent)]",
  top: "[mask-image:radial-gradient(100%_100%_at_top,white,transparent)]",
  top_left: "[mask-image:radial-gradient(100%_100%_at_top_left,white,transparent)]",
  top_right: "[mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]",
}

const GridLines = ({
  width = 100,
  className,
  height = 100,
  mask = "top_right",
  ...props
}: GridLinesProps) => {
  return (
    <svg
      aria-hidden="true"
      className={twMerge(
        "-z-10 absolute inset-0 h-full w-full stroke-fg/10",
        maskMap[mask],
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          height={height}
          id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
          patternUnits="userSpaceOnUse"
          width={width}
          x="50%"
          y={-1}
        >
          <path d="M.5 200V.5H200" fill="none" />
        </pattern>
      </defs>
      <rect
        fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
        height="100%"
        strokeWidth={0}
        width="100%"
      />
    </svg>
  )
}

export { GridLines }
