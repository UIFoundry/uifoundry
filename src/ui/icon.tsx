import type { ComponentPropsWithRef } from "react";

import { icons } from "lucide-react";

export function Icon({
  icon,
  ...svgProps
}: ComponentPropsWithRef<"svg"> & { icon: keyof typeof icons }) {
  const SelectIcon = icons[icon];
  if (!SelectIcon) {
    console.log("no icon found: ", SelectIcon, icon);
    return <></>;
  }
  return <SelectIcon {...svgProps} />;
}
