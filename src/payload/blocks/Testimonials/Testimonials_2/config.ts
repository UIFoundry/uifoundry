import type { Block } from "payload";
import {
  BLOCK_GROUP_TESTIMONIALS,
  BLOCK_SLUG_TESTIMONIALS_2,
} from "~/payload/constants/blocks";

export const Testimonials_2_Block: Block = {
  slug: BLOCK_SLUG_TESTIMONIALS_2,
  interfaceName: "Testimonials_2_Block",
  labels: { singular: "Testimonials 2", plural: "Testimonials 2's" },
  admin: { group: BLOCK_GROUP_TESTIMONIALS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Trusted by professionals",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Real stories from real users.",
    },
    {
      name: "testimonials",
      type: "array",
      required: true,
      labels: { singular: "Testimonial", plural: "Testimonials" },
      defaultValue: [
        {
          quote: "Delightful developer experience.",
          author: "Sam Park",
          role: "CTO",
        },
        {
          quote: "We ship faster than ever.",
          author: "Morgan Yu",
          role: "Engineer",
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
