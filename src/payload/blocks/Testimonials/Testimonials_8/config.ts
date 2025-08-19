import type { Block } from "payload";
import {
  BLOCK_GROUP_TESTIMONIALS,
  BLOCK_SLUG_TESTIMONIALS_8,
} from "~/payload/constants/blocks";

export const Testimonials_8_Block: Block = {
  slug: BLOCK_SLUG_TESTIMONIALS_8,
  interfaceName: "Testimonials_8_Block",
  labels: { singular: "Testimonials 8", plural: "Testimonials 8's" },
  admin: { group: BLOCK_GROUP_TESTIMONIALS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Voices of our users",
    },
    { name: "subheading", type: "text", defaultValue: "Real quotes" },
    {
      name: "testimonials",
      type: "array",
      required: true,
      labels: { singular: "Testimonial", plural: "Testimonials" },
      defaultValue: [
        { quote: "Managed hosting is a plus.", author: "Ava", role: "Founder" },
        { quote: "Accessible and fast.", author: "Noah", role: "Engineer" },
      ],
      fields: [
        { name: "quote", type: "textarea", required: true },
        { name: "author", type: "text", required: true },
        { name: "role", type: "text" },
      ],
    },
  ],
};
