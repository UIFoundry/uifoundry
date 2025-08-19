import type { Block } from "payload";
import {
  BLOCK_GROUP_FAQS,
  BLOCK_SLUG_FAQS_3,
} from "~/payload/constants/blocks";

export const FAQs_3_Block: Block = {
  slug: BLOCK_SLUG_FAQS_3,
  interfaceName: "FAQs_3_Block",
  labels: { singular: "FAQs 3", plural: "FAQs 3's" },
  admin: { group: BLOCK_GROUP_FAQS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Need help?",
    },
    { name: "subheading", type: "text", defaultValue: "We have answers." },
    {
      name: "items",
      type: "array",
      required: true,
      labels: { singular: "Item", plural: "Items" },
      defaultValue: [
        {
          question: "Do blocks support dark mode?",
          answer: "Yes, with ThemeMedia and Tailwind dark styles.",
        },
        {
          question: "Can I customize text?",
          answer: "All visible text is configurable via fields.",
        },
      ],
      fields: [
        { name: "question", type: "text", required: true, label: "Question" },
        { name: "answer", type: "textarea", required: true, label: "Answer" },
      ],
    },
  ],
};
