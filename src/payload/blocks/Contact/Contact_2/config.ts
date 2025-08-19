import type { Block } from "payload";
import {
  BLOCK_GROUP_CONTACT,
  BLOCK_SLUG_CONTACT_2,
} from "~/payload/constants/blocks";
import iconField from "~/payload/fields/iconField";

export const Contact_2_Block: Block = {
  slug: BLOCK_SLUG_CONTACT_2,
  interfaceName: "Contact_2_Block",
  labels: { singular: "Contact 2", plural: "Contact 2's" },
  admin: { group: BLOCK_GROUP_CONTACT },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Contact sales",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Talk with our team about pricing and plans.",
    },
    {
      name: "methods",
      label: "Contact Methods",
      labels: { singular: "Method", plural: "Methods" },
      type: "array",
      defaultValue: [
        {
          label: "Email",
          value: "sales@example.com",
          href: "mailto:sales@example.com",
          icon: "Mail",
        },
        {
          label: "Calendar",
          value: "Book a call",
          href: "#",
          icon: "Calendar",
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
