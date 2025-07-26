import type { Block } from "payload";
import { blocks as teamsBlocks, blockComponents as teamsBlockComponents } from "./Teams";
import { blocks as featuresBlocks, blockComponents as featuresBlockComponents } from "./Features"

export const blocks: Block[] = teamsBlocks.concat(featuresBlocks)

export const blockComponents = {
	...teamsBlockComponents,
	...featuresBlockComponents,
}

