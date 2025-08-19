import type { Block } from "payload";
import {
  BLOCK_GROUP_CONTACT,
  BLOCK_SLUG_CONTACT_9,
} from "~/payload/constants/blocks";
import iconField from "~/payload/fields/iconField";

export const Contact_9_Block: Block = {
  slug: BLOCK_SLUG_CONTACT_9,
  interfaceName: "Contact_9_Block",
  labels: { singular: "Contact 9", plural: "Contact 9's" },
  admin: { group: BLOCK_GROUP_CONTACT },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Locations",
    },
    {
      name: "subheading",
      type: "text",
      defaultValue: "Find an office near you.",
    },
    {
      name: "methods",
      label: "Contact Methods",
      labels: { singular: "Method", plural: "Methods" },
      type: "array",
      defaultValue: [
        {
          label: "San Francisco",
          value: "123 Market St",
          href: "#",
          icon: "MapPin",
        },
        {
          label: "New York",
          value: "456 Madison Ave",
          href: "#",
          icon: "MapPin",
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
