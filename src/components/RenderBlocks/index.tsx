import type { User as PayloadUser } from "~/payload-types";
import React, { type ComponentPropsWithRef, type ElementType } from "react";
import { type Block } from "payload";

type Params = Promise<{ slug: string }>;
type PageParams = Partial<Awaited<Params>>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;
type PageSearchParams = Partial<Awaited<SearchParams>>;

export interface RenderBlocksContext extends ComponentPropsWithRef<"div"> {
	blocks: Block[] | unknown[];
	blockComponents: Record<string, ElementType>;
	user?: PayloadUser | null;
	params?: PageParams;
	searchParams?: PageSearchParams;
}

const RenderBlocks: React.FC<RenderBlocksContext> = (props) => {
	const { blocks, blockComponents, params, searchParams, user, ...divProps } =
		props;
	const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

	if (blocks.length && hasBlocks) {
		return (
			blocks
				// @ts-expect-error check if block has custom 'hidden' field
				.filter((b) => !Boolean(b?.hidden))
				.map((block, index) => {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					const { blockName, blockType, key: blockKey } = block;

					if (blockType && blockType in blockComponents) {
						// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
						const Block = blockComponents[blockType];

						if (Block) {
							return (
								<Block
									// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
									id={blockName}
									params={params}
									searchParams={searchParams}
									user={user}
									// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
									key={blockKey ?? index}
									block={block}
									index={index}
									{...(block as Block)}
									{...divProps}
								/>
							);
						}
					}
					return null;
				})
		);
	}

	return null;
};

export default RenderBlocks;
