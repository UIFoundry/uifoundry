import type { Block } from "payload";
import {
  blocks as teamsBlocks,
  blockComponents as teamsBlockComponents,
} from "./Teams";
import {
  blocks as featuresBlocks,
  blockComponents as featuresBlockComponents,
} from "./Features";
import {
  blocks as heroBlocks,
  blockComponents as heroBlockComponents,
} from "./Hero";
import {
  blocks as headerBlocks,
  blockComponents as headerBlockComponents,
} from "./Header";
import {
  blocks as footerBlocks,
  blockComponents as footerBlockComponents,
} from "./Footer";
import {
  blocks as pricingBlocks,
  blockComponents as pricingBlockComponents,
} from "./Pricing";
import {
  blocks as ctaBlocks,
  blockComponents as ctaBlockComponents,
} from "./CTA";
import {
  blocks as testimonialsBlocks,
  blockComponents as testimonialsBlockComponents,
} from "./Testimonials";
import {
  blocks as logosBlocks,
  blockComponents as logosBlockComponents,
} from "./Logos";
import {
  blocks as contactBlocks,
  blockComponents as contactBlockComponents,
} from "./Contact";
import {
  blocks as comparisonBlocks,
  blockComponents as comparisonBlockComponents,
} from "./Comparison";
import {
  blocks as statsBlocks,
  blockComponents as statsBlockComponents,
} from "./Stats";
import {
  blocks as faqsBlocks,
  blockComponents as faqsBlockComponents,
} from "./FAQs";
import {
  blocks as valuePropositionBlocks,
  blockComponents as valuePropositionBlockComponents,
} from "./ValueProposition";
import {
  blocks as howItWorksBlocks,
  blockComponents as howItWorksBlockComponents,
} from "./HowItWorks";

export const blocks: Block[] = teamsBlocks
  .concat(featuresBlocks)
  .concat(heroBlocks)
  .concat(headerBlocks)
  .concat(footerBlocks)
  .concat(pricingBlocks)
  .concat(testimonialsBlocks)
  .concat(ctaBlocks)
  .concat(logosBlocks)
  .concat(contactBlocks)
  .concat(comparisonBlocks)
  .concat(statsBlocks)
  .concat(faqsBlocks)
  .concat(valuePropositionBlocks)
  .concat(howItWorksBlocks);

export const blockComponents = {
  ...teamsBlockComponents,
  ...featuresBlockComponents,
  ...heroBlockComponents,
  ...headerBlockComponents,
  ...footerBlockComponents,
  ...pricingBlockComponents,
  ...testimonialsBlockComponents,
  ...ctaBlockComponents,
  ...logosBlockComponents,
  ...contactBlockComponents,
  ...comparisonBlockComponents,
  ...statsBlockComponents,
  ...faqsBlockComponents,
  ...valuePropositionBlockComponents,
  ...howItWorksBlockComponents,
};
