import type { Block } from "payload";
import {
  BLOCK_GROUP_CONTACT,
  BLOCK_SLUG_CONTACT_6,
} from "~/payload/constants/blocks";
import iconField from "~/payload/fields/iconField";

export const Contact_6_Block: Block = {
  slug: BLOCK_SLUG_CONTACT_6,
  interfaceName: "Contact_6_Block",
  labels: { singular: "Contact 6", plural: "Contact 6's" },
  admin: { group: BLOCK_GROUP_CONTACT },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Press & media",
    },
    { name: "subheading", type: "text", defaultValue: "Reach our media team." },
    {
      name: "methods",
      label: "Contact Methods",
      labels: { singular: "Method", plural: "Methods" },
      type: "array",
      defaultValue: [
        {
          label: "Press",
          value: "press@example.com",
          href: "mailto:press@example.com",
          icon: "Megaphone",
        },
        { label: "Brand kit", value: "Download", href: "#", icon: "Box" },
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
