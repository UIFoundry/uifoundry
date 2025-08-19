import type { Block } from "payload";
import {
  BLOCK_GROUP_CONTACT,
  BLOCK_SLUG_CONTACT_10,
} from "~/payload/constants/blocks";
import iconField from "~/payload/fields/iconField";

export const Contact_10_Block: Block = {
  slug: BLOCK_SLUG_CONTACT_10,
  interfaceName: "Contact_10_Block",
  labels: { singular: "Contact 10", plural: "Contact 10's" },
  admin: { group: BLOCK_GROUP_CONTACT },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Let’s talk",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Pick from the options below.",
    },
    {
      name: "methods",
      label: "Contact Methods",
      labels: { singular: "Method", plural: "Methods" },
      type: "array",
      defaultValue: [
        {
          label: "Sales",
          value: "sales@example.com",
          href: "mailto:sales@example.com",
          icon: "DollarSign",
        },
        {
          label: "Support",
          value: "support@example.com",
          href: "mailto:support@example.com",
          icon: "LifeBuoy",
        },
        {
          label: "Partnerships",
          value: "partners@example.com",
          href: "mailto:partners@example.com",
          icon: "Handshake",
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
