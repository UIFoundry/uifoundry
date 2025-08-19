import type { Block } from "payload";
import {
  BLOCK_GROUP_TESTIMONIALS,
  BLOCK_SLUG_TESTIMONIALS_7,
} from "~/payload/constants/blocks";

export const Testimonials_7_Block: Block = {
  slug: BLOCK_SLUG_TESTIMONIALS_7,
  interfaceName: "Testimonials_7_Block",
  labels: { singular: "Testimonials 7", plural: "Testimonials 7's" },
  admin: { group: BLOCK_GROUP_TESTIMONIALS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Customer stories",
    },
    { name: "subheading", type: "text", defaultValue: "Why teams choose us." },
    {
      name: "testimonials",
      type: "array",
      required: true,
      labels: { singular: "Testimonial", plural: "Testimonials" },
      defaultValue: [
        { quote: "The admin UX is excellent.", author: "Jamie", role: "PM" },
        { quote: "Setup took minutes.", author: "Chris", role: "Engineer" },
      ],
      fields: [
        { name: "quote", type: "textarea", required: true },
        { name: "author", type: "text", required: true },
        { name: "role", type: "text" },
      ],
    },
  ],
};
