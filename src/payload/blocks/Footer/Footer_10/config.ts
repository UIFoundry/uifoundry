import type { Block } from "payload";
import { COLLECTION_SLUG_MEDIA } from "~/payload/constants";
import {
  BLOCK_GROUP_FOOTERS,
  BLOCK_SLUG_FOOTER_10,
} from "~/payload/constants/blocks";
import socialLinksField from "~/payload/fields/socialLinksField";
import uploadField from "~/payload/fields/uploadField";

export const Footer_10_Block: Block = {
  slug: BLOCK_SLUG_FOOTER_10,
  interfaceName: "Footer_10_Block",
  labels: { singular: "Footer 10", plural: "Footer 10's" },
  admin: { group: BLOCK_GROUP_FOOTERS },
  fields: [
    uploadField({ name: "brandLogo", relationTo: COLLECTION_SLUG_MEDIA }),
    { name: "description", type: "textarea" },
    {
      name: "columns",
      type: "array",
      labels: { singular: "Column", plural: "Columns" },
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
