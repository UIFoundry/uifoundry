import {
	BLOCK_SLUG_PRICING_1,
	BLOCK_SLUG_PRICING_2,
	BLOCK_SLUG_PRICING_3,
} from "~/payload/constants/blocks";

import Pricing_1, { Pricing_1_Block } from "./Pricing_1";
import Pricing_2, { Pricing_2_Block } from "./Pricing_2";
import Pricing_3, { Pricing_3_Block } from "./Pricing_3";

export const blocks = [Pricing_1_Block, Pricing_2_Block, Pricing_3_Block];

export const blockComponents = {
	[BLOCK_SLUG_PRICING_1]: Pricing_1,
	[BLOCK_SLUG_PRICING_2]: Pricing_2,
	[BLOCK_SLUG_PRICING_3]: Pricing_3,
};
