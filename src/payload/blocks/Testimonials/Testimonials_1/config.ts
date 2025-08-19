import type { Block } from "payload";
import {
  BLOCK_GROUP_TESTIMONIALS,
  BLOCK_SLUG_TESTIMONIALS_1,
} from "~/payload/constants/blocks";

export const Testimonials_1_Block: Block = {
  slug: BLOCK_SLUG_TESTIMONIALS_1,
  interfaceName: "Testimonials_1_Block",
  labels: { singular: "Testimonials 1", plural: "Testimonials 1's" },
  admin: { group: BLOCK_GROUP_TESTIMONIALS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Loved by teams worldwide",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "What our customers say about us.",
    },
    {
      name: "testimonials",
      type: "array",
      required: true,
      labels: { singular: "Testimonial", plural: "Testimonials" },
      defaultValue: [
        {
          quote: "This product changed how we build.",
          author: "Alex Johnson",
          role: "Founder, Wave",
        },
        {
          quote: "A perfect fit for our team.",
          author: "Taylor Kim",
          role: "Lead Engineer, Atlas",
        },
        {
          quote: "Incredible velocity and polish.",
          author: "Jordan Lee",
          role: "PM, Nova",
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
