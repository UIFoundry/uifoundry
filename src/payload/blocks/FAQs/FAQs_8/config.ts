import type { Block } from "payload";
import {
  BLOCK_GROUP_FAQS,
  BLOCK_SLUG_FAQS_8,
} from "~/payload/constants/blocks";

export const FAQs_8_Block: Block = {
  slug: BLOCK_SLUG_FAQS_8,
  interfaceName: "FAQs_8_Block",
  labels: { singular: "FAQs 8", plural: "FAQs 8's" },
  admin: { group: BLOCK_GROUP_FAQS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Knowledge base",
    },
    { name: "subheading", type: "text", defaultValue: "Browse common topics." },
    {
      name: "items",
      type: "array",
      required: true,
      labels: { singular: "Item", plural: "Items" },
      defaultValue: [
        { question: "Can I export content?", answer: "Yes, via Payload APIs." },
        {
          question: "Access control?",
          answer: "RBAC is planned and in progress.",
        },
      ],
      fields: [
        { name: "question", type: "text", required: true, label: "Question" },
        { name: "answer", type: "textarea", required: true, label: "Answer" },
      ],
    },
  ],
};
