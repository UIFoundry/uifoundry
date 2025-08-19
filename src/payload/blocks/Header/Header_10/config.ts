import type { Block } from "payload";
import {
  BLOCK_GROUP_HEADERS,
  BLOCK_SLUG_HEADER_10,
} from "~/payload/constants/blocks";

export const Header_10_Block: Block = {
  slug: BLOCK_SLUG_HEADER_10,
  interfaceName: "Header_10_Block",
  labels: { singular: "Header 10", plural: "Header 10's" },
  admin: { group: BLOCK_GROUP_HEADERS },
  fields: [
    { name: "brandLabel", type: "text", required: true, defaultValue: "Home" },
    { name: "brandHref", type: "text", required: true, defaultValue: "/" },
    {
      name: "menuItems",
      type: "array",
      required: true,
      defaultValue: [
        { label: "Docs", href: "#docs" },
        { label: "GitHub", href: "#" },
      ],
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true, defaultValue: "#" },
      ],
    },
  ],
};
