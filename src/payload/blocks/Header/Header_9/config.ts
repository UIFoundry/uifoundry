import type { Block } from "payload";
import {
  BLOCK_GROUP_HEADERS,
  BLOCK_SLUG_HEADER_9,
} from "~/payload/constants/blocks";

export const Header_9_Block: Block = {
  slug: BLOCK_SLUG_HEADER_9,
  interfaceName: "Header_9_Block",
  labels: { singular: "Header 9", plural: "Header 9's" },
  admin: { group: BLOCK_GROUP_HEADERS },
  fields: [
    { name: "brandLabel", type: "text", required: true, defaultValue: "Home" },
    { name: "brandHref", type: "text", required: true, defaultValue: "/" },
    {
      name: "menuItems",
      type: "array",
      required: true,
      defaultValue: [
        { label: "Home", href: "/" },
        { label: "Contact", href: "#contact" },
      ],
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true, defaultValue: "#" },
      ],
    },
  ],
};
