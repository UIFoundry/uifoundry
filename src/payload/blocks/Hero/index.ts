import {
	BLOCK_SLUG_HERO_1,
	BLOCK_SLUG_HERO_2,
	BLOCK_SLUG_HERO_3,
} from "~/payload/constants/blocks";
import Hero_1 from "./Hero_1";
import { Hero_1_Block } from "./Hero_1/config";
import Hero_2, { Hero_2_Block } from "./Hero_2";
import Hero_3 from "./Hero_3";
import { Hero_3_Block } from "./Hero_3/config";

export const blocks = [Hero_1_Block, Hero_2_Block, Hero_3_Block];

export const blockComponents = {
	[BLOCK_SLUG_HERO_1]: Hero_1,
	[BLOCK_SLUG_HERO_2]: Hero_2,
	[BLOCK_SLUG_HERO_3]: Hero_3,
};
