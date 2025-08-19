import type { Block } from "payload";
import {
  BLOCK_GROUP_HEADERS,
  BLOCK_SLUG_HEADER_6,
} from "~/payload/constants/blocks";

export const Header_6_Block: Block = {
  slug: BLOCK_SLUG_HEADER_6,
  interfaceName: "Header_6_Block",
  labels: { singular: "Header 6", plural: "Header 6's" },
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
        { label: "Pricing", href: "#pricing" },
        { label: "Blog", href: "#blog" },
      ],
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true, defaultValue: "#" },
      ],
    },
  ],
};
