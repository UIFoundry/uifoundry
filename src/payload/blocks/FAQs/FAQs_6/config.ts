import type { Block } from "payload";
import {
  BLOCK_GROUP_FAQS,
  BLOCK_SLUG_FAQS_6,
} from "~/payload/constants/blocks";

export const FAQs_6_Block: Block = {
  slug: BLOCK_SLUG_FAQS_6,
  interfaceName: "FAQs_6_Block",
  labels: { singular: "FAQs 6", plural: "FAQs 6's" },
  admin: { group: BLOCK_GROUP_FAQS },
  fields: [
    { name: "heading", type: "text", required: true, defaultValue: "Support" },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Common support questions.",
    },
    {
      name: "items",
      type: "array",
      required: true,
      labels: { singular: "Item", plural: "Items" },
      defaultValue: [
        {
          question: "How do I contact support?",
          answer: "Use the contact block or email us.",
        },
        { question: "Do you have RBAC?", answer: "Planned; coming soon." },
      ],
      fields: [
        { name: "question", type: "text", required: true, label: "Question" },
        { name: "answer", type: "textarea", required: true, label: "Answer" },
      ],
    },
  ],
};
