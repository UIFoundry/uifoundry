import { BLOCK_SLUG_TEAMS_1 } from "~/payload/constants/blocks";
import type { Block } from "payload";
import { Teams_1_Heading_Block } from "./Heading/config";
import { Teams_1_Members_Block } from "./Members/config";

export const Teams_1_Block: Block = {
	slug: BLOCK_SLUG_TEAMS_1,
	labels: {
		singular: "Teams 1",
		plural: "Teams 1's"
	},
	interfaceName: "Teams_1_Block",
	fields: [
		{
			name: "blocks",
			type: "blocks",
			labels: {
				singular: "Teams_1 - Block",
				plural: "Teams_1 - Blocks",
			},
			required: true,
			minRows: 1,
			blocks: [
				Teams_1_Heading_Block,
				Teams_1_Members_Block
			]
		}
	]
}
