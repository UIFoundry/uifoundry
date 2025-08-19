import type { Block } from "payload";
import {
  BLOCK_GROUP_TESTIMONIALS,
  BLOCK_SLUG_TESTIMONIALS_3,
} from "~/payload/constants/blocks";

export const Testimonials_3_Block: Block = {
  slug: BLOCK_SLUG_TESTIMONIALS_3,
  interfaceName: "Testimonials_3_Block",
  labels: { singular: "Testimonials 3", plural: "Testimonials 3's" },
  admin: { group: BLOCK_GROUP_TESTIMONIALS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Customers first",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Hear from teams using UIFoundry.",
    },
    {
      name: "testimonials",
      type: "array",
      required: true,
      labels: { singular: "Testimonial", plural: "Testimonials" },
      defaultValue: [
        {
          quote: "The best CMS experience I've used.",
          author: "Riley Brooks",
          role: "Designer",
        },
        {
          quote: "Our marketing velocity doubled.",
          author: "Jamie Chen",
          role: "Growth",
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
