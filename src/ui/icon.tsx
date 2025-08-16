import { icons } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

export function Icon({
  icon,
  ...svgProps
}: { icon: keyof typeof icons } & ComponentPropsWithRef<"svg">) {
  const SelectIcon = icons[icon];
  if (!SelectIcon) {
    console.log("no icon found: ", SelectIcon, icon);
    return <></>;
  }
  return <SelectIcon {...svgProps} />;
}
