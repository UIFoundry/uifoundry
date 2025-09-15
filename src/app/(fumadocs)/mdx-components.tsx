import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { createGenerator } from "fumadocs-typescript";
import { AutoTypeTable, type AutoTypeTableProps } from "fumadocs-typescript/ui";
import { TypeTable, type TypeNode } from "fumadocs-ui/components/type-table";
import { extractBlockDefaults } from "~/utils/extractBlockDefaults";

import type {
  Hero_1_Block as Hero_1_BlockType,
  Hero_2_Block as Hero_2_BlockType,
  Header_1_Block as Header_1_BlockType,
  Header_2_Block as Header_2_BlockType,
  CustomHeaderBlock as CustomHeaderBlockType,
  HeaderBrandLogoBlock as HeaderBrandLogoBlockType,
  HeaderMenuButtonBlock as HeaderMenuButtonBlockType,
  HeaderMenuItemsBlock as HeaderMenuItemsBlockType,
} from "~/payload-types";

// Import block components
import Hero_1 from "~/payload/blocks/Hero/Hero_1";
import Hero_2 from "~/payload/blocks/Hero/Hero_2";
import Header_1 from "~/payload/blocks/Header/Header_1";
import Header_2 from "~/payload/blocks/Header/Header_2";
import CustomHeader from "~/payload/blocks/Header/CustomHeader";
import HeaderBrandLogo from "~/payload/blocks/Header/CustomHeader/BrandLogo";
import HeaderMenuButton from "~/payload/blocks/Header/CustomHeader/MenuButton";
import HeaderMenuItems from "~/payload/blocks/Header/CustomHeader/MenuItems";
import { Hero_1_Block } from "~/payload/blocks/Hero/Hero_1/config";
import { Hero_2_Block } from "~/payload/blocks/Hero/Hero_2/config";
import { Header_1_Block } from "~/payload/blocks/Header/Header_1/config";
import { Header_2_Block } from "~/payload/blocks/Header/Header_2/config";
import { CustomHeaderBlock } from "~/payload/blocks/Header/CustomHeader/config";
import { HeaderBrandLogoBlock } from "~/payload/blocks/Header/CustomHeader/BrandLogo/config";
import { HeaderMenuButtonBlock } from "~/payload/blocks/Header/CustomHeader/MenuButton/config";
import { HeaderMenuItemsBlock } from "~/payload/blocks/Header/CustomHeader/MenuItems/config";

// Create TypeScript generator for AutoTypeTable
const generator = createGenerator();

// Pre-compute default values for performance
const hero1Defaults = extractBlockDefaults(Hero_1_Block);
const hero2Defaults = extractBlockDefaults(Hero_2_Block);
const header1Defaults = extractBlockDefaults(Header_1_Block);
const header2Defaults = extractBlockDefaults(Header_2_Block);
const customHeaderDefaults = extractBlockDefaults(CustomHeaderBlock);
const headerBrandLogoDefaults = extractBlockDefaults(HeaderBrandLogoBlock);
const headerMenuButtonDefaults = extractBlockDefaults(HeaderMenuButtonBlock);
const headerMenuItemsDefaults = extractBlockDefaults(HeaderMenuItemsBlock);

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
    CustomHeaderBlock: (props: Partial<CustomHeaderBlockType> = {}) => {
      const combinedProps = {
        ...customHeaderDefaults,
        ...props,
      } as CustomHeaderBlockType;
      const { id, ...otherProps } = combinedProps;
      return <CustomHeader {...otherProps} id={id ?? undefined} preview />;
    },
    HeaderBrandLogoBlock: (props: Partial<HeaderBrandLogoBlockType> = {}) => {
      const combinedProps = {
        ...headerBrandLogoDefaults,
        ...props,
      } as HeaderBrandLogoBlockType;
      const { id, ...otherProps } = combinedProps;
      return (
        <HeaderBrandLogo
          {...otherProps}
          id={id ?? undefined}
          isMobile={false}
        />
      );
    },
    HeaderMenuButtonBlock: (props: Partial<HeaderMenuButtonBlockType> = {}) => {
      const combinedProps = {
        ...headerMenuButtonDefaults,
        ...props,
      } as HeaderMenuButtonBlockType;
      const { id, ...otherProps } = combinedProps;
      return (
        <HeaderMenuButton
          {...otherProps}
          id={id ?? undefined}
          isMobile={false}
        />
      );
    },
    HeaderMenuItemsBlock: (props: Partial<HeaderMenuItemsBlockType> = {}) => {
      const combinedProps = {
        ...headerMenuItemsDefaults,
        ...props,
      } as HeaderMenuItemsBlockType;
      const { id, ...otherProps } = combinedProps;
      return (
        <HeaderMenuItems
          {...otherProps}
          id={id ?? undefined}
          isMobile={false}
        />
      );
    },
    ...components,
  };
}
