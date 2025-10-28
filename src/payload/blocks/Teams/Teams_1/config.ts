import type { Block } from "payload";

import {
	BLOCK_GROUP_TEAMS,
	BLOCK_SLUG_TEAMS_1,
} from "~/payload/constants/blocks";

import { Teams_1_Heading_Block } from "./Heading/config";
import { Teams_1_Members_Block } from "./Members/config";

export const Teams_1_Block: Block = {
	slug: BLOCK_SLUG_TEAMS_1,
	admin: {
		group: BLOCK_GROUP_TEAMS,
	},
	fields: [
		{
			name: "blocks",
			type: "blocks",
			blocks: [Teams_1_Heading_Block, Teams_1_Members_Block],
			labels: {
				plural: "Teams_1 - Blocks",
				singular: "Teams_1 - Block",
			},
			minRows: 1,
			required: true,
		},
	],
	interfaceName: "Teams_1_Block",
	labels: {
		plural: "Teams 1's",
		singular: "Teams 1",
	},
};
