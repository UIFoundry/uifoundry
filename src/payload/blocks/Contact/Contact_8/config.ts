import type { Block } from "payload";
import {
  BLOCK_GROUP_CONTACT,
  BLOCK_SLUG_CONTACT_8,
} from "~/payload/constants/blocks";
import iconField from "~/payload/fields/iconField";

export const Contact_8_Block: Block = {
  slug: BLOCK_SLUG_CONTACT_8,
  interfaceName: "Contact_8_Block",
  labels: { singular: "Contact 8", plural: "Contact 8's" },
  admin: { group: BLOCK_GROUP_CONTACT },
  fields: [
    { name: "heading", type: "text", required: true, defaultValue: "Get help" },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Choose the best way to reach out.",
    },
    {
      name: "methods",
      label: "Contact Methods",
      labels: { singular: "Method", plural: "Methods" },
      type: "array",
      defaultValue: [
        {
          label: "Email",
          value: "hello@example.com",
          href: "mailto:hello@example.com",
          icon: "Mail",
        },
        {
          label: "Community",
          value: "Join Discord",
          href: "#",
          icon: "MessageSquare",
        },
        { label: "Status", value: "Status page", href: "#", icon: "Signal" },
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
