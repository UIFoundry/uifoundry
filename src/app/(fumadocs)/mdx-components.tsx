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
	Hero_4_Block as Hero_4_BlockType,
	Hero_5_Block as Hero_5_BlockType,
	Header_1_Block as Header_1_BlockType,
	Header_2_Block as Header_2_BlockType,
	Header_3_Block as Header_3_BlockType,
	Header_4_Block as Header_4_BlockType,
	Header_5_Block as Header_5_BlockType,
	ComingSoon_1_Block as ComingSoon_1_BlockType,
} from "~/payload-types";

// Import block components
import Hero_1 from "~/payload/blocks/Hero/Hero_1";
import Hero_2 from "~/payload/blocks/Hero/Hero_2";
import Hero_3 from "~/payload/blocks/Hero/Hero_3";
import Hero_4 from "~/payload/blocks/Hero/Hero_4";
import Hero_5 from "~/payload/blocks/Hero/Hero_5";
import Header_1 from "~/payload/blocks/Header/Header_1";
import Header_2 from "~/payload/blocks/Header/Header_2";
import Header_3 from "~/payload/blocks/Header/Header_3";
import Header_4 from "~/payload/blocks/Header/Header_4";
import Header_5 from "~/payload/blocks/Header/Header_5";
import { Hero_1_Block } from "~/payload/blocks/Hero/Hero_1/config";
import { Hero_2_Block } from "~/payload/blocks/Hero/Hero_2/config";
import { Hero_3_Block } from "~/payload/blocks/Hero/Hero_3/config";
import { Hero_4_Block } from "~/payload/blocks/Hero/Hero_4/config";
import { Hero_5_Block } from "~/payload/blocks/Hero/Hero_5/config";
import { Header_1_Block } from "~/payload/blocks/Header/Header_1/config";
import { Header_2_Block } from "~/payload/blocks/Header/Header_2/config";
import { Header_3_Block } from "~/payload/blocks/Header/Header_3/config";
import { Header_4_Block } from "~/payload/blocks/Header/Header_4/config";
import { Header_5_Block } from "~/payload/blocks/Header/Header_5/config";
import ComingSoon_1 from "~/payload/blocks/ComingSoon/ComingSoon_1";
import { ComingSoon_1_Block } from "~/payload/blocks/ComingSoon/ComingSoon_1/config";

// Create TypeScript generator for AutoTypeTable
const generator = createGenerator();

// Pre-compute default values for performance
const hero1Defaults = extractBlockDefaults(Hero_1_Block);
const hero2Defaults = extractBlockDefaults(Hero_2_Block);
const hero3Defaults = extractBlockDefaults(Hero_3_Block);
const hero4Defaults = extractBlockDefaults(Hero_4_Block);
const hero5Defaults = extractBlockDefaults(Hero_5_Block);
const header1Defaults = extractBlockDefaults(Header_1_Block);
const header2Defaults = extractBlockDefaults(Header_2_Block);
const header3Defaults = extractBlockDefaults(Header_3_Block);
const header4Defaults = extractBlockDefaults(Header_4_Block);
const header5Defaults = extractBlockDefaults(Header_5_Block);
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
		Hero_4: (props: Partial<Hero_4_BlockType> = {}) => {
			const combinedProps = {
				...hero4Defaults,
				...props,
			} as Hero_4_BlockType;
			return <Hero_4 {...combinedProps} />;
		},
		Hero_5: (props: Partial<Hero_5_BlockType> = {}) => {
			const combinedProps = {
				...hero5Defaults,
				...props,
			} as Hero_5_BlockType;
			return <Hero_5 {...combinedProps} />;
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
		Header_3: (props: Partial<Header_3_BlockType> = {}) => {
			const combinedProps = {
				...header3Defaults,
				...props,
			} as Header_3_BlockType;
			const { id, ...otherProps } = combinedProps;
			return <Header_3 {...otherProps} id={id ?? undefined} preview />;
		},
		Header_4: (props: Partial<Header_4_BlockType> = {}) => {
			const combinedProps = {
				...header4Defaults,
				...props,
			} as Header_4_BlockType;
			const { id, ...otherProps } = combinedProps;
			return <Header_4 {...otherProps} id={id ?? undefined} preview />;
		},
		Header_5: (props: Partial<Header_5_BlockType> = {}) => {
			const combinedProps = {
				...header5Defaults,
				...props,
			} as Header_5_BlockType;
			const { id, ...otherProps } = combinedProps;
			return <Header_5 {...otherProps} id={id ?? undefined} preview />;
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
