import type { ClassValue } from "clsx";
import type { ComponentPropsWithRef } from "react";
import type { Comparison_1_Block } from "~/payload-types";
import { cn } from "~/styles/utils";

export default function AlignContent({
  column,
  children,
  className = "",
  ...divProps
}: {
  column: Comparison_1_Block["columns"][number];
  className?: ClassValue[] | string;
} & ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn(
        "flex w-full",
        column.alignContent === "left"
          ? "justify-start"
          : column.alignContent === "right"
            ? "justify-end"
            : "justify-center",
        className,
      )}
      {...divProps}
    >
      {children}
    </div>
  );
}
