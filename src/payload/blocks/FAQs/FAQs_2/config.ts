import type { Block } from "payload";
import {
  BLOCK_GROUP_FAQS,
  BLOCK_SLUG_FAQS_2,
} from "~/payload/constants/blocks";

export const FAQs_2_Block: Block = {
  slug: BLOCK_SLUG_FAQS_2,
  interfaceName: "FAQs_2_Block",
  labels: { singular: "FAQs 2", plural: "FAQs 2's" },
  admin: { group: BLOCK_GROUP_FAQS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Questions & answers",
    },
    { name: "subheading", type: "text", defaultValue: "Find what you need." },
    {
      name: "items",
      type: "array",
      required: true,
      labels: { singular: "Item", plural: "Items" },
      defaultValue: [
        {
          question: "How do I get started?",
          answer: "Create a page and add blocks in the admin.",
        },
        {
          question: "Is it responsive?",
          answer: "Yes, all blocks are responsive by default.",
        },
      ],
      fields: [
        { name: "question", type: "text", required: true, label: "Question" },
        { name: "answer", type: "textarea", required: true, label: "Answer" },
      ],
    },
  ],
};
