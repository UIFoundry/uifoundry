import type { Block } from "payload";
import {
  BLOCK_GROUP_TESTIMONIALS,
  BLOCK_SLUG_TESTIMONIALS_5,
} from "~/payload/constants/blocks";

export const Testimonials_5_Block: Block = {
  slug: BLOCK_SLUG_TESTIMONIALS_5,
  interfaceName: "Testimonials_5_Block",
  labels: { singular: "Testimonials 5", plural: "Testimonials 5's" },
  admin: { group: BLOCK_GROUP_TESTIMONIALS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Loved by builders",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Feedback that drives us forward.",
    },
    {
      name: "testimonials",
      type: "array",
      required: true,
      labels: { singular: "Testimonial", plural: "Testimonials" },
      defaultValue: [
        {
          quote: "Clean APIs and great design.",
          author: "Kai",
          role: "Engineer",
        },
        { quote: "A joy to work with.", author: "Remy", role: "Founder" },
      ],
      fields: [
        { name: "quote", type: "textarea", required: true },
        { name: "author", type: "text", required: true },
        { name: "role", type: "text" },
      ],
    },
  ],
};
