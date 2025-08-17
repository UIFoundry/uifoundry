import type { Block } from "payload";
import {
  BLOCK_GROUP_FEATURES,
  BLOCK_SLUG_FEATURES_8,
} from "~/payload/constants/blocks";
import uploadField from "~/payload/fields/uploadField";

export const Features_8_Block: Block = {
  slug: BLOCK_SLUG_FEATURES_8,
  interfaceName: "Features_8_Block",
  labels: { singular: "Features 8", plural: "Features 8's" },
  admin: { group: BLOCK_GROUP_FEATURES },
  fields: [
    {
      name: "header",
      type: "text",
      required: true,
      defaultValue: "Integrates with your stack",
    },
    {
      name: "subheader",
      type: "text",
      defaultValue: "Connect your favorite tools",
    },
    {
      name: "logos",
      type: "array",
      labels: { singular: "Logo", plural: "Logos" },
      minRows: 6,
      fields: [
        { name: "name", type: "text", required: true },
        uploadField({ name: "logo" }),
        { name: "href", type: "text" },
      ],
      defaultValue: [
        { name: "GitHub", href: "https://github.com" },
        { name: "Vercel", href: "https://vercel.com" },
        { name: "Netlify", href: "https://netlify.com" },
        { name: "Zapier", href: "https://zapier.com" },
        { name: "Stripe", href: "https://stripe.com" },
        { name: "Slack", href: "https://slack.com" },
      ],
    },
  ],
};
