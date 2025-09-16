import type { Header } from "~/payload-types";
import RenderBlocks from "~/components/RenderBlocks";
import type { ComponentPropsWithRef } from "react";
import { cn } from "~/styles/utils";
import { blockComponents } from "~/payload/blocks/Header/config";

export * from "./config";

export default function Header({
	header,
	className,
	...divProps
}: { header: Header } & ComponentPropsWithRef<"div">) {
	return (
		<RenderBlocks
			blocks={header.header}
			blockComponents={blockComponents}
			className={cn("w-full", className)}
			{...divProps}
		/>
	);
}
