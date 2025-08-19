import type { Block } from "payload";
import {
  BLOCK_GROUP_CONTACT,
  BLOCK_SLUG_CONTACT_4,
} from "~/payload/constants/blocks";
import iconField from "~/payload/fields/iconField";

export const Contact_4_Block: Block = {
  slug: BLOCK_SLUG_CONTACT_4,
  interfaceName: "Contact_4_Block",
  labels: { singular: "Contact 4", plural: "Contact 4's" },
  admin: { group: BLOCK_GROUP_CONTACT },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "We’re here to help",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Reach us via one of the channels below.",
    },
    {
      name: "methods",
      label: "Contact Methods",
      labels: { singular: "Method", plural: "Methods" },
      type: "array",
      defaultValue: [
        {
          label: "Support",
          value: "support@example.com",
          href: "mailto:support@example.com",
          icon: "LifeBuoy",
        },
        {
          label: "Community",
          value: "Join Discord",
          href: "#",
          icon: "MessageSquare",
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
