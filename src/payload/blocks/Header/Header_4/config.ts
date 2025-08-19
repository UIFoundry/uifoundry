import type { Block } from "payload";
import {
  BLOCK_GROUP_HEADERS,
  BLOCK_SLUG_HEADER_4,
} from "~/payload/constants/blocks";

export const Header_4_Block: Block = {
  slug: BLOCK_SLUG_HEADER_4,
  interfaceName: "Header_4_Block",
  labels: {
    singular: "Header 4",
    plural: "Header 4's",
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
      name: "announcement",
      label: "Announcement Banner",
      type: "text",
      required: false,
      defaultValue: "We just launched v2.0 — Read more",
    },
    {
      name: "announcementHref",
      label: "Announcement Href",
      type: "text",
      required: false,
      defaultValue: "#",
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
