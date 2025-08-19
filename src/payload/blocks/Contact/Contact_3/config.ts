import type { Block } from "payload";
import {
  BLOCK_GROUP_CONTACT,
  BLOCK_SLUG_CONTACT_3,
} from "~/payload/constants/blocks";
import iconField from "~/payload/fields/iconField";

export const Contact_3_Block: Block = {
  slug: BLOCK_SLUG_CONTACT_3,
  interfaceName: "Contact_3_Block",
  labels: { singular: "Contact 3", plural: "Contact 3's" },
  admin: { group: BLOCK_GROUP_CONTACT },
  fields: [
    { name: "heading", type: "text", required: true, defaultValue: "Support" },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Reach our support team via any channel.",
    },
    {
      name: "methods",
      label: "Contact Methods",
      labels: { singular: "Method", plural: "Methods" },
      type: "array",
      defaultValue: [
        {
          label: "Email",
          value: "support@example.com",
          href: "mailto:support@example.com",
          icon: "Mail",
        },
        { label: "Chat", value: "Live chat", href: "#", icon: "MessageCircle" },
        { label: "Twitter", value: "@example", href: "#", icon: "Twitter" },
      ],
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "text" },
        { name: "href", type: "text" },
        iconField(),
      ],
    },
  ],
};
