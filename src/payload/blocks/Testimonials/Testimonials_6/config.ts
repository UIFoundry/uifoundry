import type { Block } from "payload";
import {
  BLOCK_GROUP_TESTIMONIALS,
  BLOCK_SLUG_TESTIMONIALS_6,
} from "~/payload/constants/blocks";

export const Testimonials_6_Block: Block = {
  slug: BLOCK_SLUG_TESTIMONIALS_6,
  interfaceName: "Testimonials_6_Block",
  labels: { singular: "Testimonials 6", plural: "Testimonials 6's" },
  admin: { group: BLOCK_GROUP_TESTIMONIALS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Teams love UIFoundry",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Stories from real users.",
    },
    {
      name: "testimonials",
      type: "array",
      required: true,
      labels: { singular: "Testimonial", plural: "Testimonials" },
      defaultValue: [
        { quote: "It’s our new standard.", author: "Alex", role: "Founder" },
        {
          quote: "Shipped in days, not weeks.",
          author: "Taylor",
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
