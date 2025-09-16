import {
	BLOCK_SLUG_HERO_1,
	BLOCK_SLUG_HERO_2,
} from "~/payload/constants/blocks";
import Hero_1 from "./Hero_1";
import { Hero_1_Block } from "./Hero_1/config";
import Hero_2, { Hero_2_Block } from "./Hero_2";

export const blocks = [Hero_1_Block, Hero_2_Block];

export const blockComponents = {
	[BLOCK_SLUG_HERO_1]: Hero_1,
	[BLOCK_SLUG_HERO_2]: Hero_2,
};
