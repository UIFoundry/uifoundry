import type { Footer } from "~/payload-types"
import RenderBlocks from "~/components/RenderBlocks"
import type { ComponentPropsWithRef } from "react"
import { cn } from "~/styles/utils"
import { blockComponents } from "~/payload/blocks/Footer"

export * from "./config"

export default function Footer({ footer, className, ...divProps }: { footer: Footer } & ComponentPropsWithRef<"div">) {
	return (
		<RenderBlocks blocks={footer.footer} blockComponents={blockComponents} className={cn("w-full", className)} {...divProps} />
	)
}
