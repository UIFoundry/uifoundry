import type { Teams_1_Heading_Block } from "~/payload-types";

export default function Heading({ text }: Teams_1_Heading_Block) {
	return (
		<h3 className="pb-6 text-lg font-medium">{text}</h3>
	)
}
