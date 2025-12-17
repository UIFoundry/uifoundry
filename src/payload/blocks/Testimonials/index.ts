import {
	BLOCK_SLUG_TESTIMONIALS_1,
	BLOCK_SLUG_TESTIMONIALS_2,
	BLOCK_SLUG_TESTIMONIALS_3,
	BLOCK_SLUG_TESTIMONIALS_4,
	BLOCK_SLUG_TESTIMONIALS_5,
} from "~/payload/constants/blocks";

import Testimonials1 from "./Testimonials_1";
import { Testimonials_1_Block } from "./Testimonials_1/config";
import Testimonials2 from "./Testimonials_2";
import { Testimonials_2_Block } from "./Testimonials_2/config";
import Testimonials3 from "./Testimonials_3";
import { Testimonials_3_Block } from "./Testimonials_3/config";
import Testimonials4 from "./Testimonials_4";
import { Testimonials_4_Block } from "./Testimonials_4/config";
import Testimonials5 from "./Testimonials_5";
import { Testimonials_5_Block } from "./Testimonials_5/config";

export { Testimonials_1_Block } from "./Testimonials_1/config";
export { Testimonials_2_Block } from "./Testimonials_2/config";
export { Testimonials_3_Block } from "./Testimonials_3/config";
export { Testimonials_4_Block } from "./Testimonials_4/config";
export { Testimonials_5_Block } from "./Testimonials_5/config";

export const blocks = [
	Testimonials_1_Block,
	Testimonials_2_Block,
	Testimonials_3_Block,
	Testimonials_4_Block,
	Testimonials_5_Block,
];

export const blockComponents = {
	[BLOCK_SLUG_TESTIMONIALS_1]: Testimonials1,
	[BLOCK_SLUG_TESTIMONIALS_2]: Testimonials2,
	[BLOCK_SLUG_TESTIMONIALS_3]: Testimonials3,
	[BLOCK_SLUG_TESTIMONIALS_4]: Testimonials4,
	[BLOCK_SLUG_TESTIMONIALS_5]: Testimonials5,
};
