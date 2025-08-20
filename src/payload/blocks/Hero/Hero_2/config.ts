import {
	BLOCK_GROUP_HERO,
	BLOCK_SLUG_HERO_2,
} from "~/payload/constants/blocks";
import type { Block } from "payload";
import headerField from "../fields/header";
import subHeaderField from "../fields/subheader";
import callToActionPair from "../fields/callToActionPair";
import mediaField from "~/payload/fields/mediaField/config";

export const Hero_2_Block: Block = {
	slug: BLOCK_SLUG_HERO_2,
	labels: {
		singular: "Hero 2",
		plural: "Hero 2's",
	},
	admin: {
		group: BLOCK_GROUP_HERO,
	},
	interfaceName: "Hero_2_Block",
	fields: [
		headerField(),
		subHeaderField(),
		mediaField({ name: "background", label: "Background Media" }),
		callToActionPair(),
	],
};
