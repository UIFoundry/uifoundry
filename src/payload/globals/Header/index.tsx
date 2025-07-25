import type { Header } from "~/payload-types"
import RenderBlocks from "~/components/RenderBlocks"
import Header_1 from "~/payload/blocks/Headers/Header_1"
import { BLOCK_SLUG_HEADER_1 } from "~/payload/constants/blocks"
import type { ComponentPropsWithRef } from "react"
import { cn } from "~/styles/utils"

const blockComponents = {
	[BLOCK_SLUG_HEADER_1]: Header_1
}

export default function Header({ header, className, ...divProps }: { header: Header } & ComponentPropsWithRef<"div">) {
	return (
		<RenderBlocks blocks={header.header} blockComponents={blockComponents} className={cn("w-full", className)} {...divProps} />
	)
}
