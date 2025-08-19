import type { Block } from "payload";
import { COLLECTION_SLUG_MEDIA } from "~/payload/constants";
import {
  BLOCK_GROUP_FOOTERS,
  BLOCK_SLUG_FOOTER_4,
} from "~/payload/constants/blocks";
import socialLinksField from "~/payload/fields/socialLinksField";
import uploadField from "~/payload/fields/uploadField";

export const Footer_4_Block: Block = {
  slug: BLOCK_SLUG_FOOTER_4,
  interfaceName: "Footer_4_Block",
  labels: { singular: "Footer 4", plural: "Footer 4's" },
  admin: { group: BLOCK_GROUP_FOOTERS },
  fields: [
    uploadField({ name: "brandLogo", relationTo: COLLECTION_SLUG_MEDIA }),
    {
      name: "description",
      type: "textarea",
      defaultValue: "Create and scale.",
    },
    {
      name: "columns",
      type: "array",
      labels: { singular: "Column", plural: "Columns" },
      defaultValue: [
        { title: "Product", links: [{ label: "Features", href: "#" }] },
      ],
      fields: [
        { name: "title", type: "text", required: true },
        {
          name: "links",
          type: "array",
          fields: [
            { name: "label", type: "text", required: true },
            { name: "href", type: "text", required: true, defaultValue: "#" },
          ],
        },
      ],
    },
    socialLinksField(),
    {
      name: "copyright",
      type: "text",
      defaultValue: "UIFoundry. All rights reserved.",
    },
  ],
};
