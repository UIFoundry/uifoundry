import type { Block } from "payload";
import {
  BLOCK_GROUP_HEADERS,
  BLOCK_SLUG_HEADER_7,
} from "~/payload/constants/blocks";

export const Header_7_Block: Block = {
  slug: BLOCK_SLUG_HEADER_7,
  interfaceName: "Header_7_Block",
  labels: { singular: "Header 7", plural: "Header 7's" },
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
        { label: "Docs", href: "#docs" },
      ],
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true, defaultValue: "#" },
      ],
    },
  ],
};
