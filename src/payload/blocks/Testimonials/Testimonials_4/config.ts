import type { Block } from "payload";
import {
  BLOCK_GROUP_TESTIMONIALS,
  BLOCK_SLUG_TESTIMONIALS_4,
} from "~/payload/constants/blocks";

export const Testimonials_4_Block: Block = {
  slug: BLOCK_SLUG_TESTIMONIALS_4,
  interfaceName: "Testimonials_4_Block",
  labels: { singular: "Testimonials 4", plural: "Testimonials 4's" },
  admin: { group: BLOCK_GROUP_TESTIMONIALS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "What people are saying",
    },
    { name: "subheading", type: "text", defaultValue: "Customer testimonials" },
    {
      name: "testimonials",
      type: "array",
      required: true,
      labels: { singular: "Testimonial", plural: "Testimonials" },
      defaultValue: [
        { quote: "It just works.", author: "Dana Scott", role: "Engineer" },
        {
          quote: "Simple and powerful.",
          author: "Chris Pratt",
          role: "Marketer",
        },
      ],
      fields: [
        { name: "quote", type: "textarea", required: true },
        { name: "author", type: "text", required: true },
        { name: "role", type: "text" },
      ],
    },
  ],
};
