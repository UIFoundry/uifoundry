import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { createGenerator } from "fumadocs-typescript";
import { AutoTypeTable } from "fumadocs-typescript/ui";
import { extractBlockDefaults } from "~/utils/extractBlockDefaults";

// Import block components
import Hero_1 from "~/payload/blocks/Hero/Hero_1";
import Hero_2 from "~/payload/blocks/Hero/Hero_2";
import { Hero_1_Block } from "~/payload/blocks/Hero/Hero_1/config";
import { Hero_2_Block } from "~/payload/blocks/Hero/Hero_2/config";

// Create TypeScript generator for AutoTypeTable
const generator = createGenerator();

// Pre-compute default values for performance
const hero1Defaults = extractBlockDefaults(Hero_1_Block);
const hero2Defaults = extractBlockDefaults(Hero_2_Block);

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    // AutoTypeTable component
    AutoTypeTable: (props: any) => (
      <AutoTypeTable {...props} generator={generator} />
    ),
    // Block components with default values
    Hero_1: (props: any) => <Hero_1 {...hero1Defaults} {...props} />,
    Hero_2: (props: any) => <Hero_2 {...hero2Defaults} {...props} />,
    ...components,
  };
}
