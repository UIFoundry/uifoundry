import type { Block } from "payload";
import {
  BLOCK_GROUP_FAQS,
  BLOCK_SLUG_FAQS_7,
} from "~/payload/constants/blocks";

export const FAQs_7_Block: Block = {
  slug: BLOCK_SLUG_FAQS_7,
  interfaceName: "FAQs_7_Block",
  labels: { singular: "FAQs 7", plural: "FAQs 7's" },
  admin: { group: BLOCK_GROUP_FAQS },
  fields: [
    { name: "heading", type: "text", required: true, defaultValue: "Product" },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Common product questions.",
    },
    {
      name: "items",
      type: "array",
      required: true,
      labels: { singular: "Item", plural: "Items" },
      defaultValue: [
        {
          question: "Do you support forms?",
          answer: "Form builder is planned for a future release.",
        },
        {
          question: "Multiple sites?",
          answer: "Yes, planned multi-site support.",
        },
      ],
      fields: [
        { name: "question", type: "text", required: true, label: "Question" },
        { name: "answer", type: "textarea", required: true, label: "Answer" },
      ],
    },
  ],
};
