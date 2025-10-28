import type { Block } from "payload";

import {
  blockComponents as aboutBlockComponents,
  blocks as aboutBlocks,
} from "./About";
import {
  blockComponents as comingSoonBlockComponents,
  blocks as comingSoonBlocks,
} from "./ComingSoon";
import {
  blockComponents as contactBlockComponents,
  blocks as contactBlocks,
} from "./Contact";
import {
  blockComponents as ctaBlockComponents,
  blocks as ctaBlocks,
} from "./CTA";
import {
  blockComponents as faqBlockComponents,
  blocks as faqBlocks,
} from "./FAQ";
import {
  blockComponents as featuresBlockComponents,
  blocks as featuresBlocks,
} from "./Features";
import {
  blockComponents as galleryBlockComponents,
  blocks as galleryBlocks,
} from "./Gallery";
import {
  blockComponents as heroBlockComponents,
  blocks as heroBlocks,
} from "./Hero";
import {
  blockComponents as newsletterBlockComponents,
  blocks as newsletterBlocks,
} from "./Newsletter";
import {
  blockComponents as pricingBlockComponents,
  blocks as pricingBlocks,
} from "./Pricing";
import {
  blockComponents as statsBlockComponents,
  blocks as statsBlocks,
} from "./Stats";
import {
  blockComponents as teamsBlockComponents,
  blocks as teamsBlocks,
} from "./Teams";
import {
  blockComponents as testimonialsBlockComponents,
  blocks as testimonialsBlocks,
} from "./Testimonials";

export const blocks: Block[] = teamsBlocks
  .concat(featuresBlocks)
  .concat(heroBlocks)
  .concat(ctaBlocks)
  .concat(testimonialsBlocks)
  .concat(faqBlocks)
  .concat(pricingBlocks)
  .concat(aboutBlocks)
  .concat(contactBlocks)
  .concat(newsletterBlocks)
  .concat(statsBlocks)
  .concat(galleryBlocks)
  .concat(comingSoonBlocks);

export const blockComponents = {
  ...teamsBlockComponents,
  ...featuresBlockComponents,
  ...heroBlockComponents,
  ...ctaBlockComponents,
  ...testimonialsBlockComponents,
  ...faqBlockComponents,
  ...pricingBlockComponents,
  ...aboutBlockComponents,
  ...contactBlockComponents,
  ...newsletterBlockComponents,
  ...statsBlockComponents,
  ...galleryBlockComponents,
  ...comingSoonBlockComponents,
};
