import type { Header } from "~/payload-types"
import RenderBlocks from "~/components/RenderBlocks"
import type { ComponentPropsWithRef } from "react"
import { cn } from "~/styles/utils"
import { BLOCK_SLUG_HEADER_1, BLOCK_SLUG_HEADER_2 } from "~/payload/constants/blocks"
import Header_1 from "~/payload/blocks/Headers/Header_1"
import Header_2 from "~/payload/blocks/Headers/Header_2"

const blockComponents = {
	[BLOCK_SLUG_HEADER_1]: Header_1,
	[BLOCK_SLUG_HEADER_2]: Header_2
}

export default function Header({ header, className, ...divProps }: { header: Header } & ComponentPropsWithRef<"div">) {
	return (
		<RenderBlocks blocks={header.header} blockComponents={blockComponents} className={cn("w-full", className)} {...divProps} />
	)
}
