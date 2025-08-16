import type { Block } from "payload";
import { COLLECTION_SLUG_MEDIA } from "~/payload/constants";
import { BLOCK_SLUG_FOOTER_1 } from "~/payload/constants/blocks";
import socialLinksField from "~/payload/fields/socialLinksField";
import uploadField from "~/payload/fields/uploadField";

export const Footer_1_Block: Block = {
  slug: BLOCK_SLUG_FOOTER_1,
  interfaceName: "Footer_1_Block",
  labels: {
    singular: "Footer 1",
    plural: "Footer 1's",
  },
  fields: [
    uploadField({
      name: "brandLogo",
      label: "Brand Logo",
      relationTo: COLLECTION_SLUG_MEDIA,
    }),
    {
      name: "copyright",
      type: "text",
      label: "Copyright",
    },
    {
      name: "links",
      type: "array",
      labels: {
        singular: "Link",
        plural: "Links",
      },
      fields: [
        {
          name: "label",
          type: "text",
          label: "Label",
          required: true,
        },
        {
          name: "href",
          type: "text",
          label: "Link (Href)",
          required: true,
        },
      ],
    },
    socialLinksField(),
  ],
};
