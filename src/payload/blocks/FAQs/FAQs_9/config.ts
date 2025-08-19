import type { Block } from "payload";
import {
  BLOCK_GROUP_FAQS,
  BLOCK_SLUG_FAQS_9,
} from "~/payload/constants/blocks";

export const FAQs_9_Block: Block = {
  slug: BLOCK_SLUG_FAQS_9,
  interfaceName: "FAQs_9_Block",
  labels: { singular: "FAQs 9", plural: "FAQs 9's" },
  admin: { group: BLOCK_GROUP_FAQS },
  fields: [
    { name: "heading", type: "text", required: true, defaultValue: "FAQ" },
    { name: "subheading", type: "text", defaultValue: "Common questions" },
    {
      name: "items",
      type: "array",
      required: true,
      labels: { singular: "Item", plural: "Items" },
      defaultValue: [
        { question: "SaaS hosting?", answer: "Planned AWS via SST." },
        { question: "Icons?", answer: "Lucide icons with validated names." },
      ],
      fields: [
        { name: "question", type: "text", required: true, label: "Question" },
        { name: "answer", type: "textarea", required: true, label: "Answer" },
      ],
    },
  ],
};
