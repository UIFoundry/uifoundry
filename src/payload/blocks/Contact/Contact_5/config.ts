import type { Block } from "payload";
import {
  BLOCK_GROUP_CONTACT,
  BLOCK_SLUG_CONTACT_5,
} from "~/payload/constants/blocks";
import iconField from "~/payload/fields/iconField";

export const Contact_5_Block: Block = {
  slug: BLOCK_SLUG_CONTACT_5,
  interfaceName: "Contact_5_Block",
  labels: { singular: "Contact 5", plural: "Contact 5's" },
  admin: { group: BLOCK_GROUP_CONTACT },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Contact our team",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Pick a method to reach us.",
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
          label: "Phone",
          value: "+1 (555) 123-4567",
          href: "tel:+15551234567",
          icon: "Phone",
        },
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
