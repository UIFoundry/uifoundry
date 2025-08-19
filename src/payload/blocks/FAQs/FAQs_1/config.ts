import type { Block } from "payload";
import {
  BLOCK_GROUP_FAQS,
  BLOCK_SLUG_FAQS_1,
} from "~/payload/constants/blocks";

export const FAQs_1_Block: Block = {
  slug: BLOCK_SLUG_FAQS_1,
  interfaceName: "FAQs_1_Block",
  labels: { singular: "FAQs 1", plural: "FAQs 1's" },
  admin: { group: BLOCK_GROUP_FAQS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Frequently asked questions",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Answers to common questions.",
    },
    {
      name: "items",
      type: "array",
      required: true,
      labels: { singular: "Item", plural: "Items" },
      defaultValue: [
        {
          question: "What is UIFoundry?",
          answer: "A PayloadCMS template for marketing sites.",
        },
        {
          question: "Can I self-host?",
          answer: "Yes, deploy anywhere supporting Node.js.",
        },
        {
          question: "Is there dark mode?",
          answer: "All blocks support light and dark themes.",
        },
      ],
      fields: [
        { name: "question", type: "text", required: true, label: "Question" },
        { name: "answer", type: "textarea", required: true, label: "Answer" },
      ],
    },
  ],
};
