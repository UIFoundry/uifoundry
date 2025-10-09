import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { createGenerator } from "fumadocs-typescript";
import { AutoTypeTable, type AutoTypeTableProps } from "fumadocs-typescript/ui";
import { TypeTable, type TypeNode } from "fumadocs-ui/components/type-table";
import { extractBlockDefaults } from "~/utils/extractBlockDefaults";

import type {
	Hero_1_Block as Hero_1_BlockType,
	Hero_2_Block as Hero_2_BlockType,
	Hero_3_Block as Hero_3_BlockType,
	Header_1_Block as Header_1_BlockType,
	Header_2_Block as Header_2_BlockType,
	ComingSoon_1_Block as ComingSoon_1_BlockType,
} from "~/payload-types";

// Import block components
import Hero_1 from "~/payload/blocks/Hero/Hero_1";
import Hero_2 from "~/payload/blocks/Hero/Hero_2";
import Hero_3 from "~/payload/blocks/Hero/Hero_3";
import Header_1 from "~/payload/blocks/Header/Header_1";
import Header_2 from "~/payload/blocks/Header/Header_2";
import { Hero_1_Block } from "~/payload/blocks/Hero/Hero_1/config";
import { Hero_2_Block } from "~/payload/blocks/Hero/Hero_2/config";
import { Hero_3_Block } from "~/payload/blocks/Hero/Hero_3/config";
import { Header_1_Block } from "~/payload/blocks/Header/Header_1/config";
import { Header_2_Block } from "~/payload/blocks/Header/Header_2/config";
import ComingSoon_1 from "~/payload/blocks/ComingSoon/ComingSoon_1";
import { ComingSoon_1_Block } from "~/payload/blocks/ComingSoon/ComingSoon_1/config";

// Create TypeScript generator for AutoTypeTable
const generator = createGenerator();

// Pre-compute default values for performance
const hero1Defaults = extractBlockDefaults(Hero_1_Block);
const hero2Defaults = extractBlockDefaults(Hero_2_Block);
const hero3Defaults = extractBlockDefaults(Hero_3_Block);
const header1Defaults = extractBlockDefaults(Header_1_Block);
const header2Defaults = extractBlockDefaults(Header_2_Block);
const comingSoon1Defaults = extractBlockDefaults(ComingSoon_1_Block);

export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		// AutoTypeTable component
		AutoTypeTable: (props: AutoTypeTableProps) => (
			<AutoTypeTable {...props} generator={generator} />
		),
		TypeTable: ({ type }: { type: Record<string, TypeNode> }) => (
			<TypeTable type={type} />
		),
		// Block components with default values
		Hero_1: (props: Hero_1_BlockType) => (
			<Hero_1 {...hero1Defaults} {...props} />
		),
		Hero_2: (props: Hero_2_BlockType) => (
			<Hero_2 {...hero2Defaults} {...props} />
		),
		Hero_3: (props: Partial<Hero_3_BlockType> = {}) => {
			const combinedProps = {
				...hero3Defaults,
				...props,
			} as Hero_3_BlockType;
			return (
				<div className="relative">
					<Hero_3 {...combinedProps} />
				</div>
			);
		},
		Header_1: (props: Partial<Header_1_BlockType> = {}) => {
			const combinedProps = {
				...header1Defaults,
				...props,
			} as Header_1_BlockType;
			const { id, ...otherProps } = combinedProps;
			return <Header_1 {...otherProps} id={id ?? undefined} preview />;
		},
		Header_2: (props: Partial<Header_2_BlockType> = {}) => {
			const combinedProps = {
				...header2Defaults,
				...props,
			} as Header_2_BlockType;
			const { id, ...otherProps } = combinedProps;
			return <Header_2 {...otherProps} id={id ?? undefined} preview />;
		},
		ComingSoon1: (props: Partial<ComingSoon_1_BlockType>) => {
			const combinedProps = {
				...comingSoon1Defaults,
				...props,
			} as ComingSoon_1_BlockType;
			return <ComingSoon_1 {...combinedProps} />;
		},
		...components,
	};
}
