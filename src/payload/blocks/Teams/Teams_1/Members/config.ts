import type { Block } from "payload";
import { BLOCK_SLUG_TEAMS_1_MEMBERS } from "~/payload/constants/blocks";

export const Teams_1_Members_Block: Block = {
	slug: BLOCK_SLUG_TEAMS_1_MEMBERS,
	interfaceName: "Teams_1_Members_Block",
	labels: {
		singular: "Teams 1 - Members",
		plural: "Teams 1 - Members'",
	},
	fields: [
		{
			name: "members",
			labels: {
				singular: "Team Member",
				plural: "Team Memnbers"
			},
			type: "array",
			required: true,
			defaultValue: [],
			fields: [
				{
					name: "name",
					label: "Member Name",
					type: "text",
					required: true,
				},
				{
					name: "role",
					label: "Member Role",
					type: "text",
					required: true,
				},
				// {
				// 	name: "avatar",
				// 	type: "text",
				// 	required: true,
				// },
			]
		}
	]
}
