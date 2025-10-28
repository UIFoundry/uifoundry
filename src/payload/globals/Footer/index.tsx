import type { ComponentPropsWithRef } from "react";

import type { Footer } from "~/payload-types";

import RenderBlocks from "~/components/RenderBlocks";
import { blockComponents } from "~/payload/blocks/Footer";
import { cn } from "~/styles/utils";

export * from "./config";

export default function Footer({
  className,
  footer,
  ...divProps
}: ComponentPropsWithRef<"div"> & { footer: Footer }) {
  return (
    <RenderBlocks
      blockComponents={blockComponents}
      blocks={footer.footer}
      className={cn("w-full", className)}
      {...divProps}
    />
  );
}
