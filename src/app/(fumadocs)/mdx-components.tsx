import type { MDXComponents } from "mdx/types";

import { createGenerator } from "fumadocs-typescript";
import { AutoTypeTable, type AutoTypeTableProps } from "fumadocs-typescript/ui";
import { type TypeNode, TypeTable } from "fumadocs-ui/components/type-table";
import defaultMdxComponents from "fumadocs-ui/mdx";

import type {
  ComingSoon_1_Block as ComingSoon_1_BlockType,
  CTA_1_Block as CTA_1_BlockType,
  CTA_2_Block as CTA_2_BlockType,
  CTA_3_Block as CTA_3_BlockType,
  Features_1_Block as Features_1_BlockType,
  Features_2_Block as Features_2_BlockType,
  Features_3_Block as Features_3_BlockType,
  Footer_1_Block as Footer_1_BlockType,
  Footer_2_Block as Footer_2_BlockType,
  Footer_3_Block as Footer_3_BlockType,
  Footer_4_Block as Footer_4_BlockType,
  Footer_5_Block as Footer_5_BlockType,
  Header_1_Block as Header_1_BlockType,
  Header_2_Block as Header_2_BlockType,
  Header_3_Block as Header_3_BlockType,
  Header_4_Block as Header_4_BlockType,
  Header_5_Block as Header_5_BlockType,
  Hero_1_Block as Hero_1_BlockType,
  Hero_2_Block as Hero_2_BlockType,
  Hero_3_Block as Hero_3_BlockType,
  Hero_4_Block as Hero_4_BlockType,
  Hero_5_Block as Hero_5_BlockType,
  Pricing_1_Block as Pricing_1_BlockType,
  Pricing_2_Block as Pricing_2_BlockType,
  Pricing_3_Block as Pricing_3_BlockType,
  Testimonials_1_Block as Testimonials_1_BlockType,
  Testimonials_2_Block as Testimonials_2_BlockType,
  Testimonials_3_Block as Testimonials_3_BlockType,
  Testimonials_4_Block as Testimonials_4_BlockType,
  Testimonials_5_Block as Testimonials_5_BlockType,
} from "~/payload-types";

import ComingSoon_1 from "~/payload/blocks/ComingSoon/ComingSoon_1";
import { ComingSoon_1_Block } from "~/payload/blocks/ComingSoon/ComingSoon_1/config";
import CTA_1 from "~/payload/blocks/CTA/CTA_1";
import { CTA_1_Block } from "~/payload/blocks/CTA/CTA_1/config";
import CTA_2 from "~/payload/blocks/CTA/CTA_2";
import { CTA_2_Block } from "~/payload/blocks/CTA/CTA_2/config";
import CTA_3 from "~/payload/blocks/CTA/CTA_3";
import { CTA_3_Block } from "~/payload/blocks/CTA/CTA_3/config";
import Features_1 from "~/payload/blocks/Features/Features_1";
import { Features_1_Block } from "~/payload/blocks/Features/Features_1/config";
import Features_2 from "~/payload/blocks/Features/Features_2";
import { Features_2_Block } from "~/payload/blocks/Features/Features_2/config";
import Features_3 from "~/payload/blocks/Features/Features_3";
import { Features_3_Block } from "~/payload/blocks/Features/Features_3/config";
import Footer_1 from "~/payload/blocks/Footer/Footer_1";
import { Footer_1_Block } from "~/payload/blocks/Footer/Footer_1/config";
import Footer_2 from "~/payload/blocks/Footer/Footer_2";
import { Footer_2_Block } from "~/payload/blocks/Footer/Footer_2/config";
import Footer_3 from "~/payload/blocks/Footer/Footer_3";
import { Footer_3_Block } from "~/payload/blocks/Footer/Footer_3/config";
import Footer_4 from "~/payload/blocks/Footer/Footer_4";
import { Footer_4_Block } from "~/payload/blocks/Footer/Footer_4/config";
import Footer_5 from "~/payload/blocks/Footer/Footer_5";
import { Footer_5_Block } from "~/payload/blocks/Footer/Footer_5/config";
import Header_1 from "~/payload/blocks/Header/Header_1";
import { Header_1_Block } from "~/payload/blocks/Header/Header_1/config";
import Header_2 from "~/payload/blocks/Header/Header_2";
import { Header_2_Block } from "~/payload/blocks/Header/Header_2/config";
import Header_3 from "~/payload/blocks/Header/Header_3";
import { Header_3_Block } from "~/payload/blocks/Header/Header_3/config";
import Header_4 from "~/payload/blocks/Header/Header_4";
import { Header_4_Block } from "~/payload/blocks/Header/Header_4/config";
import Header_5 from "~/payload/blocks/Header/Header_5";
import { Header_5_Block } from "~/payload/blocks/Header/Header_5/config";
// Import block components
import Hero_1 from "~/payload/blocks/Hero/Hero_1";
import { Hero_1_Block } from "~/payload/blocks/Hero/Hero_1/config";
import Hero_2 from "~/payload/blocks/Hero/Hero_2";
import { Hero_2_Block } from "~/payload/blocks/Hero/Hero_2/config";
import Hero_3 from "~/payload/blocks/Hero/Hero_3";
import { Hero_3_Block } from "~/payload/blocks/Hero/Hero_3/config";
import Hero_4 from "~/payload/blocks/Hero/Hero_4";
import { Hero_4_Block } from "~/payload/blocks/Hero/Hero_4/config";
import Hero_5 from "~/payload/blocks/Hero/Hero_5";
import { Hero_5_Block } from "~/payload/blocks/Hero/Hero_5/config";
import Pricing_1 from "~/payload/blocks/Pricing/Pricing_1";
import { Pricing_1_Block } from "~/payload/blocks/Pricing/Pricing_1/config";
import Pricing_2 from "~/payload/blocks/Pricing/Pricing_2";
import { Pricing_2_Block } from "~/payload/blocks/Pricing/Pricing_2/config";
import Pricing_3 from "~/payload/blocks/Pricing/Pricing_3";
import { Pricing_3_Block } from "~/payload/blocks/Pricing/Pricing_3/config";
import Testimonials_1 from "~/payload/blocks/Testimonials/Testimonials_1";
import { Testimonials_1_Block } from "~/payload/blocks/Testimonials/Testimonials_1/config";
import Testimonials_2 from "~/payload/blocks/Testimonials/Testimonials_2";
import { Testimonials_2_Block } from "~/payload/blocks/Testimonials/Testimonials_2/config";
import Testimonials_3 from "~/payload/blocks/Testimonials/Testimonials_3";
import { Testimonials_3_Block } from "~/payload/blocks/Testimonials/Testimonials_3/config";
import Testimonials_4 from "~/payload/blocks/Testimonials/Testimonials_4";
import { Testimonials_4_Block } from "~/payload/blocks/Testimonials/Testimonials_4/config";
import Testimonials_5 from "~/payload/blocks/Testimonials/Testimonials_5";
import { Testimonials_5_Block } from "~/payload/blocks/Testimonials/Testimonials_5/config";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/ui/card";
import { extractBlockDefaults } from "~/utils/extractBlockDefaults";

// Create TypeScript generator for AutoTypeTable
const generator = createGenerator();

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
    ComingSoon1: (props: Partial<ComingSoon_1_BlockType>) => {
      const comingSoon1Defaults = extractBlockDefaults(ComingSoon_1_Block);
      const combinedProps = {
        ...comingSoon1Defaults,
        ...props,
      } as ComingSoon_1_BlockType;
      return <ComingSoon_1 {...combinedProps} />;
    },
    CTA_1: (props: Partial<CTA_1_BlockType> = {}) => {
      const cta1Defaults = extractBlockDefaults(CTA_1_Block);
      const combinedProps = {
        ...cta1Defaults,
        ...props,
      } as CTA_1_BlockType;
      const { id, ...otherProps } = combinedProps;
      return <CTA_1 id={id ?? undefined} {...otherProps} />;
    },
    CTA_2: (props: Partial<CTA_2_BlockType> = {}) => {
      const cta2Defaults = extractBlockDefaults(CTA_2_Block);
      const combinedProps = {
        ...cta2Defaults,
        ...props,
      } as CTA_2_BlockType;
      const { id, ...otherProps } = combinedProps;
      return <CTA_2 id={id ?? undefined} {...otherProps} />;
    },
    CTA_3: (props: Partial<CTA_3_BlockType> = {}) => {
      const cta3Defaults = extractBlockDefaults(CTA_3_Block);
      const combinedProps = {
        ...cta3Defaults,
        ...props,
      } as CTA_3_BlockType;
      const { id, ...otherProps } = combinedProps;
      return <CTA_3 id={id ?? undefined} {...otherProps} />;
    },
    Features_1: (props: Partial<Features_1_BlockType> = {}) => {
      const features1Defaults = extractBlockDefaults(Features_1_Block);
      const combinedProps = {
        ...features1Defaults,
        ...props,
      } as Features_1_BlockType;
      const { id, ...otherProps } = combinedProps;
      return <Features_1 id={id ?? undefined} {...otherProps} />;
    },
    Features_2: (props: Partial<Features_2_BlockType> = {}) => {
      const features2Defaults = extractBlockDefaults(Features_2_Block);
      const combinedProps = {
        ...features2Defaults,
        ...props,
      } as Features_2_BlockType;
      const { id, ...otherProps } = combinedProps;
      return <Features_2 id={id ?? undefined} {...otherProps} />;
    },
    Features_3: (props: Partial<Features_3_BlockType> = {}) => {
      const features3Defaults = extractBlockDefaults(Features_3_Block);
      const combinedProps = {
        ...features3Defaults,
        ...props,
      } as Features_3_BlockType;
      const { id, ...otherProps } = combinedProps;
      return <Features_3 id={id ?? undefined} {...otherProps} />;
    },
    Footer_1: (props: Partial<Footer_1_BlockType> = {}) => {
      const footer1Defaults = extractBlockDefaults(Footer_1_Block);
      const combinedProps = {
        ...footer1Defaults,
        ...props,
      } as Footer_1_BlockType;
      const { id, ...otherProps } = combinedProps;
      return <Footer_1 id={id ?? undefined} {...otherProps} />;
    },
    Footer_2: (props: Partial<Footer_2_BlockType> = {}) => {
      const footer2Defaults = extractBlockDefaults(Footer_2_Block);
      const combinedProps = {
        ...footer2Defaults,
        ...props,
      } as Footer_2_BlockType;
      const { id, ...otherProps } = combinedProps;
      return <Footer_2 id={id ?? undefined} {...otherProps} />;
    },
    Footer_3: (props: Partial<Footer_3_BlockType> = {}) => {
      const footer3Defaults = extractBlockDefaults(Footer_3_Block);
      const combinedProps = {
        ...footer3Defaults,
        ...props,
      } as Footer_3_BlockType;
      const { id, ...otherProps } = combinedProps;
      return <Footer_3 id={id ?? undefined} {...otherProps} />;
    },
    Footer_4: (props: Partial<Footer_4_BlockType> = {}) => {
      const footer4Defaults = extractBlockDefaults(Footer_4_Block);
      const combinedProps = {
        ...footer4Defaults,
        ...props,
      } as Footer_4_BlockType;
      const { id, ...otherProps } = combinedProps;
      return <Footer_4 id={id ?? undefined} {...otherProps} />;
    },
    Footer_5: (props: Partial<Footer_5_BlockType> = {}) => {
      const footer5Defaults = extractBlockDefaults(Footer_5_Block);
      const combinedProps = {
        ...footer5Defaults,
        ...props,
      } as Footer_5_BlockType;
      const { id, ...otherProps } = combinedProps;
      return <Footer_5 id={id ?? undefined} {...otherProps} />;
    },
    Header_1: (props: Partial<Header_1_BlockType> = {}) => {
      const header1Defaults = extractBlockDefaults(Header_1_Block);
      const combinedProps = {
        ...header1Defaults,
        ...props,
      } as Header_1_BlockType;
      const { id, ...otherProps } = combinedProps;
      return <Header_1 {...otherProps} id={id ?? undefined} preview />;
    },
    Header_2: (props: Partial<Header_2_BlockType> = {}) => {
      const header2Defaults = extractBlockDefaults(Header_2_Block);
      const combinedProps = {
        ...header2Defaults,
        ...props,
      } as Header_2_BlockType;
      const { id, ...otherProps } = combinedProps;
      return <Header_2 {...otherProps} id={id ?? undefined} preview />;
    },
    Header_3: (props: Partial<Header_3_BlockType> = {}) => {
      const header3Defaults = extractBlockDefaults(Header_3_Block);
      const combinedProps = {
        ...header3Defaults,
        ...props,
      } as Header_3_BlockType;
      const { id, ...otherProps } = combinedProps;
      return <Header_3 {...otherProps} id={id ?? undefined} preview />;
    },
    Header_4: (props: Partial<Header_4_BlockType> = {}) => {
      const header4Defaults = extractBlockDefaults(Header_4_Block);
      const combinedProps = {
        ...header4Defaults,
        ...props,
      } as Header_4_BlockType;
      const { id, ...otherProps } = combinedProps;
      return <Header_4 {...otherProps} id={id ?? undefined} preview />;
    },
    Header_5: (props: Partial<Header_5_BlockType> = {}) => {
      const header5Defaults = extractBlockDefaults(Header_5_Block);
      const combinedProps = {
        ...header5Defaults,
        ...props,
      } as Header_5_BlockType;
      const { id, ...otherProps } = combinedProps;
      return <Header_5 {...otherProps} id={id ?? undefined} preview />;
    },
    Hero_1: (props: Hero_1_BlockType) => {
      const hero1Defaults = extractBlockDefaults(Hero_1_Block);
      return <Hero_1 {...hero1Defaults} {...props} />
    },
    Hero_2: (props: Hero_2_BlockType) => {
      const hero2Defaults = extractBlockDefaults(Hero_2_Block);
      return <Hero_2 {...hero2Defaults} {...props} />
    },
    Hero_3: (props: Partial<Hero_3_BlockType> = {}) => {
      const hero3Defaults = extractBlockDefaults(Hero_3_Block);
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
      const hero4Defaults = extractBlockDefaults(Hero_4_Block);
      const combinedProps = {
        ...hero4Defaults,
        ...props,
      } as Hero_4_BlockType;
      return <Hero_4 {...combinedProps} />;
    },
    Hero_5: (props: Partial<Hero_5_BlockType> = {}) => {
      const hero5Defaults = extractBlockDefaults(Hero_5_Block);
      const combinedProps = {
        ...hero5Defaults,
        ...props,
      } as Hero_5_BlockType;
      return <Hero_5 {...combinedProps} />;
    },
    Pricing_1: (props: Partial<Pricing_1_BlockType> = {}) => {
      const pricing1Defaults = extractBlockDefaults(Pricing_1_Block);
      const combinedProps = {
        ...pricing1Defaults,
        ...props,
      } as Pricing_1_BlockType;
      const { id, ...otherProps } = combinedProps;
      return <Pricing_1 id={id ?? undefined} {...otherProps} />;
    },
    Pricing_2: (props: Partial<Pricing_2_BlockType> = {}) => {
      const pricing2Defaults = extractBlockDefaults(Pricing_2_Block);
      const combinedProps = {
        ...pricing2Defaults,
        ...props,
      } as Pricing_2_BlockType;
      const { id, ...otherProps } = combinedProps;
      return <Pricing_2 id={id ?? undefined} {...otherProps} />;
    },
    Pricing_3: (props: Partial<Pricing_3_BlockType> = {}) => {
      const pricing3Defaults = extractBlockDefaults(Pricing_3_Block);
      const combinedProps = {
        ...pricing3Defaults,
        ...props,
      } as Pricing_3_BlockType;
      const { id, ...otherProps } = combinedProps;
      return <Pricing_3 id={id ?? undefined} {...otherProps} />;
    },
    Testimonials_1: (props: Partial<Testimonials_1_BlockType> = {}) => {
      const testimonials1Defaults = extractBlockDefaults(Testimonials_1_Block);
      const combinedProps = {
        ...testimonials1Defaults,
        ...props,
      } as Testimonials_1_BlockType;
      const { id, ...otherProps } = combinedProps;
      return <Testimonials_1 id={id ?? undefined} {...otherProps} />;
    },
    Testimonials_2: (props: Partial<Testimonials_2_BlockType> = {}) => {
      const testimonials2Defaults = extractBlockDefaults(Testimonials_2_Block);
      const combinedProps = {
        ...testimonials2Defaults,
        ...props,
      } as Testimonials_2_BlockType;
      const { id, ...otherProps } = combinedProps;
      return <Testimonials_2 id={id ?? undefined} {...otherProps} />;
    },
    Testimonials_3: (props: Partial<Testimonials_3_BlockType> = {}) => {
      const testimonials3Defaults = extractBlockDefaults(Testimonials_3_Block);
      const combinedProps = {
        ...testimonials3Defaults,
        ...props,
      } as Testimonials_3_BlockType;
      const { id, ...otherProps } = combinedProps;
      return <Testimonials_3 id={id ?? undefined} {...otherProps} />;
    },
    Testimonials_4: (props: Partial<Testimonials_4_BlockType> = {}) => {
      const testimonials4Defaults = extractBlockDefaults(Testimonials_4_Block);
      const combinedProps = {
        ...testimonials4Defaults,
        ...props,
      } as Testimonials_4_BlockType;
      const { id, ...otherProps } = combinedProps;
      return <Testimonials_4 id={id ?? undefined} {...otherProps} />;
    },
    Testimonials_5: (props: Partial<Testimonials_5_BlockType> = {}) => {
      const testimonials5Defaults = extractBlockDefaults(Testimonials_5_Block);
      const combinedProps = {
        ...testimonials5Defaults,
        ...props,
      } as Testimonials_5_BlockType;
      const { id, ...otherProps } = combinedProps;
      return <Testimonials_5 id={id ?? undefined} {...otherProps} />;
    },
    // UI Components
    Card: (props: React.ComponentProps<"div">) => <Card {...props} />,
    CardAction: (props: React.ComponentProps<"div">) => (
      <CardAction {...props} />
    ),
    CardContent: (props: React.ComponentProps<"div">) => (
      <CardContent {...props} />
    ),
    CardDescription: (props: React.ComponentProps<"div">) => (
      <CardDescription {...props} />
    ),
    CardFooter: (props: React.ComponentProps<"div">) => (
      <CardFooter {...props} />
    ),
    CardHeader: (props: React.ComponentProps<"div">) => (
      <CardHeader {...props} />
    ),
    CardTitle: (props: React.ComponentProps<"div">) => <CardTitle {...props} />,
    ...components,
  };
}
