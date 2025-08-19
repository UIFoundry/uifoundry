import type { Block } from "payload";
import {
  BLOCK_GROUP_CONTACT,
  BLOCK_SLUG_CONTACT_7,
} from "~/payload/constants/blocks";
import iconField from "~/payload/fields/iconField";

export const Contact_7_Block: Block = {
  slug: BLOCK_SLUG_CONTACT_7,
  interfaceName: "Contact_7_Block",
  labels: { singular: "Contact 7", plural: "Contact 7's" },
  admin: { group: BLOCK_GROUP_CONTACT },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Talk to a human",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Our team responds within 24 hours.",
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
        { label: "Chat", value: "Live chat", href: "#", icon: "MessageCircle" },
        {
          label: "Phone",
          value: "+1 (555) 123-4567",
          href: "tel:+15551234567",
          icon: "Phone",
        },
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
