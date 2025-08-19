import type { Block } from "payload";
import { COLLECTION_SLUG_MEDIA } from "~/payload/constants";
import {
  BLOCK_GROUP_FOOTERS,
  BLOCK_SLUG_FOOTER_2,
} from "~/payload/constants/blocks";
import socialLinksField from "~/payload/fields/socialLinksField";
import uploadField from "~/payload/fields/uploadField";

export const Footer_2_Block: Block = {
  slug: BLOCK_SLUG_FOOTER_2,
  interfaceName: "Footer_2_Block",
  labels: {
    singular: "Footer 2",
    plural: "Footer 2's",
  },
  admin: {
    group: BLOCK_GROUP_FOOTERS,
  },
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
      defaultValue:
        "Create, launch, and scale your marketing site with UIFoundry.",
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
        { name: "title", type: "text", label: "Title", required: true },
        {
          name: "links",
          type: "array",
          labels: { singular: "Link", plural: "Links" },
          fields: [
            { name: "label", type: "text", label: "Label", required: true },
            {
              name: "href",
              type: "text",
              label: "Href",
              required: true,
              defaultValue: "#",
            },
          ],
        },
      ],
    },
    socialLinksField(),
    {
      name: "newsletterLabel",
      type: "text",
      label: "Newsletter Label",
      defaultValue: "Subscribe to our newsletter",
    },
    {
      name: "newsletterPlaceholder",
      type: "text",
      label: "Newsletter Placeholder",
      defaultValue: "Enter your email",
    },
    {
      name: "newsletterButtonLabel",
      type: "text",
      label: "Newsletter Button Label",
      defaultValue: "Join",
    },
    {
      name: "copyright",
      type: "text",
      label: "Copyright",
      defaultValue: "UIFoundry. All rights reserved.",
    },
  ],
};
