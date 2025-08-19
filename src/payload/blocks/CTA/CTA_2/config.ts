import { BLOCK_GROUP_CTA, BLOCK_SLUG_CTA_2 } from "~/payload/constants/blocks";
import type { Block } from "payload";
import mediaField from "~/payload/fields/mediaField";

export const CTA_2_Block: Block = {
  slug: BLOCK_SLUG_CTA_2,
  labels: {
    singular: "CTA 2 - Newsletter Signup",
    plural: "CTA 2's",
  },
  admin: {
    group: BLOCK_GROUP_CTA,
  },
  interfaceName: "CTA_2_Block",
  fields: [
    {
      name: "eyebrow",
      label: "Eyebrow Text",
      type: "text",
      defaultValue: "Stay Updated",
    },
    {
      name: "header",
      label: "Header",
      type: "text",
      defaultValue: "Get the latest updates",
      required: true,
    },
    {
      name: "subheader",
      label: "SubHeader",
      defaultValue:
        "Subscribe to our newsletter and be the first to know about new features, updates, and exclusive content.",
      type: "text",
    },
    {
      name: "placeholder",
      label: "Email Placeholder",
      type: "text",
      defaultValue: "Enter your email address",
    },
    {
      name: "ctaLabel",
      label: "CTA Button Label",
      type: "text",
      required: true,
      defaultValue: "Subscribe Now",
    },
    {
      name: "privacy",
      label: "Privacy Text",
      type: "text",
      defaultValue: "We respect your privacy. No spam, unsubscribe anytime.",
    },
    mediaField({
      name: "backgroundImage",
      label: "Background Image (Optional)",
    }),
  ],
};
