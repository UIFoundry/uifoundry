import type { Block } from "payload";
import {
  BLOCK_GROUP_FAQS,
  BLOCK_SLUG_FAQS_5,
} from "~/payload/constants/blocks";

export const FAQs_5_Block: Block = {
  slug: BLOCK_SLUG_FAQS_5,
  interfaceName: "FAQs_5_Block",
  labels: { singular: "FAQs 5", plural: "FAQs 5's" },
  admin: { group: BLOCK_GROUP_FAQS },
  fields: [
    { name: "heading", type: "text", required: true, defaultValue: "FAQs" },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Quick answers to common questions.",
    },
    {
      name: "items",
      type: "array",
      required: true,
      labels: { singular: "Item", plural: "Items" },
      defaultValue: [
        {
          question: "Is this open source?",
          answer: "Key parts are; SaaS uses licensed templates.",
        },
        {
          question: "What about performance?",
          answer: "Optimized images, reduced motion, and lazy loads.",
        },
      ],
      fields: [
        { name: "question", type: "text", required: true, label: "Question" },
        { name: "answer", type: "textarea", required: true, label: "Answer" },
      ],
    },
  ],
};
