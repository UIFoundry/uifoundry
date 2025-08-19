import type { Block } from "payload";
import {
  BLOCK_GROUP_FAQS,
  BLOCK_SLUG_FAQS_4,
} from "~/payload/constants/blocks";

export const FAQs_4_Block: Block = {
  slug: BLOCK_SLUG_FAQS_4,
  interfaceName: "FAQs_4_Block",
  labels: { singular: "FAQs 4", plural: "FAQs 4's" },
  admin: { group: BLOCK_GROUP_FAQS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "All your questions, answered",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Still need help? Contact us.",
    },
    {
      name: "items",
      type: "array",
      required: true,
      labels: { singular: "Item", plural: "Items" },
      defaultValue: [
        {
          question: "Can I add custom blocks?",
          answer: "Yes, follow the block pattern to register.",
        },
        {
          question: "How do I preview?",
          answer: "Use the live preview in the admin UI.",
        },
      ],
      fields: [
        { name: "question", type: "text", required: true, label: "Question" },
        { name: "answer", type: "textarea", required: true, label: "Answer" },
      ],
    },
  ],
};
