import type { Block } from "payload";
import {
  BLOCK_GROUP_CONTACT,
  BLOCK_SLUG_CONTACT_1,
} from "~/payload/constants/blocks";
import iconField from "~/payload/fields/iconField";

export const Contact_1_Block: Block = {
  slug: BLOCK_SLUG_CONTACT_1,
  interfaceName: "Contact_1_Block",
  labels: { singular: "Contact 1", plural: "Contact 1's" },
  admin: { group: BLOCK_GROUP_CONTACT },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Get in touch",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "We'd love to hear from you.",
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
