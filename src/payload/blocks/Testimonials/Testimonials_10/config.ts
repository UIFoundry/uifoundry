import type { Block } from "payload";
import {
  BLOCK_GROUP_TESTIMONIALS,
  BLOCK_SLUG_TESTIMONIALS_10,
} from "~/payload/constants/blocks";

export const Testimonials_10_Block: Block = {
  slug: BLOCK_SLUG_TESTIMONIALS_10,
  interfaceName: "Testimonials_10_Block",
  labels: { singular: "Testimonials 10", plural: "Testimonials 10's" },
  admin: { group: BLOCK_GROUP_TESTIMONIALS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Hear it from them",
    },
    { name: "subheading", type: "text", defaultValue: "User reviews" },
    {
      name: "testimonials",
      type: "array",
      required: true,
      labels: { singular: "Testimonial", plural: "Testimonials" },
      defaultValue: [
        { quote: "Saved us weeks.", author: "Zoe", role: "Marketer" },
        { quote: "A brilliant kit.", author: "Eli", role: "Founder" },
      ],
      fields: [
        { name: "quote", type: "textarea", required: true },
        { name: "author", type: "text", required: true },
        { name: "role", type: "text" },
      ],
    },
  ],
};
