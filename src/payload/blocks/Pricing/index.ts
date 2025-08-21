import { BLOCK_SLUG_PRICING_1 } from "~/payload/constants/blocks";
import Pricing_1, { Pricing_1_Block } from "./Pricing_1";

export const blocks = [Pricing_1_Block];

export const blockComponents = {
	[BLOCK_SLUG_PRICING_1]: Pricing_1,
};
