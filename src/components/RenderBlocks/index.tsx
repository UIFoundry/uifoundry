import { type Block } from "payload";
import React, { type ComponentPropsWithRef, type ElementType } from "react";

import type { User as PayloadUser } from "~/payload-types";

export interface RenderBlocksContext extends ComponentPropsWithRef<"div"> {
	blockComponents: Record<string, ElementType>;
	blocks: Block[] | unknown[];
	meta?: unknown;
	mobileView?: boolean;
	params?: PageParams;
	searchParams?: PageSearchParams;
	user?: null | PayloadUser;
}
type PageParams = Partial<Awaited<Params>>;
type PageSearchParams = Partial<Awaited<SearchParams>>;
type Params = Promise<{ slug: string }>;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const RenderBlocks: React.FC<RenderBlocksContext> = (props) => {
	const {
		blockComponents,
		blocks,
		meta,
		mobileView = false,
		params,
		searchParams,
		user,
		...divProps
	} = props;
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
									block={block}
									// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
									id={blockName}
									index={index}
									// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
									key={blockKey ?? index}
									meta={meta}
									mobileView={mobileView}
									params={params}
									searchParams={searchParams}
									user={user}
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
