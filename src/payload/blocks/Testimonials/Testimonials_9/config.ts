import type { Block } from "payload";
import {
  BLOCK_GROUP_TESTIMONIALS,
  BLOCK_SLUG_TESTIMONIALS_9,
} from "~/payload/constants/blocks";

export const Testimonials_9_Block: Block = {
  slug: BLOCK_SLUG_TESTIMONIALS_9,
  interfaceName: "Testimonials_9_Block",
  labels: { singular: "Testimonials 9", plural: "Testimonials 9's" },
  admin: { group: BLOCK_GROUP_TESTIMONIALS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "What customers say",
    },
    { name: "subheading", type: "text", defaultValue: "Social proof" },
    {
      name: "testimonials",
      type: "array",
      required: true,
      labels: { singular: "Testimonial", plural: "Testimonials" },
      defaultValue: [
        { quote: "Delightful UI and DX.", author: "Maya", role: "Engineer" },
        { quote: "Recommended to peers.", author: "Leo", role: "Founder" },
      ],
      fields: [
        { name: "quote", type: "textarea", required: true },
        { name: "author", type: "text", required: true },
        { name: "role", type: "text" },
      ],
    },
  ],
};
