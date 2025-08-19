import type { Block } from "payload";
import { COLLECTION_SLUG_MEDIA } from "~/payload/constants";
import {
  BLOCK_GROUP_FOOTERS,
  BLOCK_SLUG_FOOTER_3,
} from "~/payload/constants/blocks";
import socialLinksField from "~/payload/fields/socialLinksField";
import uploadField from "~/payload/fields/uploadField";

export const Footer_3_Block: Block = {
  slug: BLOCK_SLUG_FOOTER_3,
  interfaceName: "Footer_3_Block",
  labels: { singular: "Footer 3", plural: "Footer 3's" },
  admin: { group: BLOCK_GROUP_FOOTERS },
  fields: [
    uploadField({
      name: "brandLogo",
      label: "Brand Logo",
      relationTo: COLLECTION_SLUG_MEDIA,
    }),
    {
      name: "description",
      type: "textarea",
      label: "Short Description",
      defaultValue: "Build and scale with UIFoundry.",
    },
    {
      name: "columns",
      type: "array",
      labels: { singular: "Column", plural: "Columns" },
      defaultValue: [
        {
          title: "Product",
          links: [
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About", href: "#about" },
            { label: "Contact", href: "#contact" },
          ],
        },
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
