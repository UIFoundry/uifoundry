import type { Block } from "payload";
import {
  BLOCK_GROUP_HEADERS,
  BLOCK_SLUG_HEADER_8,
} from "~/payload/constants/blocks";

export const Header_8_Block: Block = {
  slug: BLOCK_SLUG_HEADER_8,
  interfaceName: "Header_8_Block",
  labels: { singular: "Header 8", plural: "Header 8's" },
  admin: { group: BLOCK_GROUP_HEADERS },
  fields: [
    { name: "brandLabel", type: "text", required: true, defaultValue: "Home" },
    { name: "brandHref", type: "text", required: true, defaultValue: "/" },
    {
      name: "menuItems",
      type: "array",
      required: true,
      defaultValue: [
        { label: "Changelog", href: "#changelog" },
        { label: "Pricing", href: "#pricing" },
      ],
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true, defaultValue: "#" },
      ],
    },
  ],
};
