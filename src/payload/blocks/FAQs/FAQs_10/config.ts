import type { Block } from "payload";
import {
  BLOCK_GROUP_FAQS,
  BLOCK_SLUG_FAQS_10,
} from "~/payload/constants/blocks";

export const FAQs_10_Block: Block = {
  slug: BLOCK_SLUG_FAQS_10,
  interfaceName: "FAQs_10_Block",
  labels: { singular: "FAQs 10", plural: "FAQs 10's" },
  admin: { group: BLOCK_GROUP_FAQS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Help center",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Your questions answered.",
    },
    {
      name: "items",
      type: "array",
      required: true,
      labels: { singular: "Item", plural: "Items" },
      defaultValue: [
        {
          question: "Does it support animations?",
          answer: "Yes, with motion primitives and reduced-motion support.",
        },
        {
          question: "Accessibility?",
          answer: "Semantic markup and focus-visible styles are used.",
        },
      ],
      fields: [
        { name: "question", type: "text", required: true, label: "Question" },
        { name: "answer", type: "textarea", required: true, label: "Answer" },
      ],
    },
  ],
};
