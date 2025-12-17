import { twMerge } from "tailwind-merge"

export interface ContainerProps extends React.ComponentProps<"div"> {
  constrained?: boolean
}

export function Container({ className, constrained = false, ref, ...props }: ContainerProps) {
  return (
    <div
      className={twMerge(
        "mx-auto w-full max-w-7xl [--container-padding:--spacing(4)] xl:max-w-(--breakpoint-xl) 2xl:max-w-(--breakpoint-2xl)",
        constrained ? "sm:px-(--container-padding)" : "px-(--container-padding)",
        className,
      )}
      {...props}
      ref={ref}
    />
  )
}
