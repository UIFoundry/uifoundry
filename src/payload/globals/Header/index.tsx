import type { ComponentPropsWithRef } from "react";

import type { Header } from "~/payload-types";

import RenderBlocks from "~/components/RenderBlocks";
import { blockComponents } from "~/payload/blocks/Header/config";
import { cn } from "~/styles/utils";

export * from "./config";

export default function Header({
	className,
	header,
	...divProps
}: ComponentPropsWithRef<"div"> & { header: Header }) {
	return (
		<RenderBlocks
			blockComponents={blockComponents}
			blocks={header.header}
			className={cn("w-full", className)}
			{...divProps}
		/>
	);
}
