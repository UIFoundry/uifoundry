import {
	BLOCK_SLUG_HERO_1,
	BLOCK_SLUG_HERO_2,
	BLOCK_SLUG_HERO_3,
	BLOCK_SLUG_HERO_4,
	BLOCK_SLUG_HERO_5,
} from "~/payload/constants/blocks";
import Hero_1 from "./Hero_1";
import { Hero_1_Block } from "./Hero_1/config";
import Hero_2 from "./Hero_2";
import { Hero_2_Block } from "./Hero_2/config";
import Hero_3 from "./Hero_3";
import { Hero_3_Block } from "./Hero_3/config";
import Hero_4 from "./Hero_4";
import { Hero_4_Block } from "./Hero_4/config";
import Hero_5 from "./Hero_5";
import { Hero_5_Block } from "./Hero_5/config";

export const blocks = [Hero_1_Block, Hero_2_Block, Hero_3_Block, Hero_4_Block, Hero_5_Block];

export const blockComponents = {
	[BLOCK_SLUG_HERO_1]: Hero_1,
	[BLOCK_SLUG_HERO_2]: Hero_2,
	[BLOCK_SLUG_HERO_3]: Hero_3,
	[BLOCK_SLUG_HERO_4]: Hero_4,
	[BLOCK_SLUG_HERO_5]: Hero_5,
};
