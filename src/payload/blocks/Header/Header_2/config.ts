import type { Block } from "payload";
import {
  BLOCK_GROUP_HEADERS,
  BLOCK_SLUG_HEADER_2,
} from "~/payload/constants/blocks";

export const Header_2_Block: Block = {
  slug: BLOCK_SLUG_HEADER_2,
  interfaceName: "Header_2_Block",
  labels: {
    singular: "Header 2",
    plural: "Header 2's",
  },
  admin: {
    group: BLOCK_GROUP_HEADERS,
  },
  fields: [
    {
      name: "brandLabel",
      label: "Brand Label",
      type: "text",
      required: true,
      defaultValue: "Home",
    },
    {
      name: "brandHref",
      label: "Brand Href",
      type: "text",
      required: true,
      defaultValue: "/",
    },
    {
      name: "menuItems",
      labels: {
        singular: "Menu Item",
        plural: "Menu Items",
      },
      type: "array",
      required: true,
      defaultValue: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Contact", href: "#contact" },
      ],
      fields: [
        {
          name: "label",
          label: "Label",
          type: "text",
          required: true,
          defaultValue: "Item",
        },
        {
          name: "href",
          label: "Href",
          type: "text",
          required: true,
          admin: {
            placeholder: "/features | #features",
          },
          defaultValue: "#",
        },
      ],
    },
  ],
};
