import { BLOCK_SLUG_HERO_1 } from "~/payload/constants/blocks"
import Hero_1, { Hero_1_Block } from "./Hero_1"

export const blocks = [Hero_1_Block]

export const blockComponents = {
	[BLOCK_SLUG_HERO_1]: Hero_1
}
