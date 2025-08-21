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
  blocks as ctaBlocks,
  blockComponents as ctaBlockComponents,
} from "./CTA";
import {
  blocks as testimonialsBlocks,
  blockComponents as testimonialsBlockComponents,
} from "./Testimonials";
import {
  blocks as faqBlocks,
  blockComponents as faqBlockComponents,
} from "./FAQ";
import {
  blocks as pricingBlocks,
  blockComponents as pricingBlockComponents,
} from "./Pricing";
import {
  blocks as aboutBlocks,
  blockComponents as aboutBlockComponents,
} from "./About";
import {
  blocks as contactBlocks,
  blockComponents as contactBlockComponents,
} from "./Contact";
import {
  blocks as newsletterBlocks,
  blockComponents as newsletterBlockComponents,
} from "./Newsletter";
import {
  blocks as statsBlocks,
  blockComponents as statsBlockComponents,
} from "./Stats";
import {
  blocks as galleryBlocks,
  blockComponents as galleryBlockComponents,
} from "./Gallery";

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
  .concat(galleryBlocks);

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
};
