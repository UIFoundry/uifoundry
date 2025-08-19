import type { Block } from "payload";
import {
  BLOCK_GROUP_HEADERS,
  BLOCK_SLUG_HEADER_5,
} from "~/payload/constants/blocks";

export const Header_5_Block: Block = {
  slug: BLOCK_SLUG_HEADER_5,
  interfaceName: "Header_5_Block",
  labels: { singular: "Header 5", plural: "Header 5's" },
  admin: { group: BLOCK_GROUP_HEADERS },
  fields: [
    { name: "brandLabel", type: "text", required: true, defaultValue: "Home" },
    { name: "brandHref", type: "text", required: true, defaultValue: "/" },
    {
      name: "menuItems",
      type: "array",
      required: true,
      defaultValue: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Contact", href: "#contact" },
      ],
      labels: { singular: "Menu Item", plural: "Menu Items" },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true, defaultValue: "#" },
      ],
    },
  ],
};
