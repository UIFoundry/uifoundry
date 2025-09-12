import type { Header } from "~/payload-types";
import RenderBlocks from "@/registry/default/components/RenderBlocks";
import type { ComponentPropsWithRef } from "react";
import { cn } from "@/registry/ui/utils";
import { blockComponents } from "@/registry/default/lib/blocks/Header";

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
