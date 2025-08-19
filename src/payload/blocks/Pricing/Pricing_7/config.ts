import type { Block } from "payload";
import {
  BLOCK_GROUP_PRICING,
  BLOCK_SLUG_PRICING_7,
} from "~/payload/constants/blocks";

export const Pricing_7_Block: Block = {
  slug: BLOCK_SLUG_PRICING_7,
  interfaceName: "Pricing_7_Block",
  labels: { singular: "Pricing 7", plural: "Pricing 7's" },
  admin: { group: BLOCK_GROUP_PRICING },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Simple pricing",
    },
    {
      name: "subheading",
      type: "text",
      required: false,
      defaultValue: "Pick a plan that fits your needs.",
    },
    {
      name: "plans",
      type: "array",
      required: true,
      defaultValue: [
        {
          name: "Starter",
          price: "$19/mo",
          highlight: false,
          features: ["1 project", "Community support"],
        },
        {
          name: "Pro",
          price: "$49/mo",
          highlight: true,
          features: ["Unlimited projects", "Priority support"],
        },
      ],
      labels: { singular: "Plan", plural: "Plans" },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "price", type: "text", required: true },
        { name: "description", type: "textarea" },
        {
          name: "highlight",
          type: "checkbox",
          required: true,
          defaultValue: false,
        },
        {
          name: "features",
          type: "array",
          labels: { singular: "Feature", plural: "Features" },
          defaultValue: ["Feature A", "Feature B"],
          fields: [{ name: "feature", type: "text", required: true }],
        },
        { name: "ctaLabel", type: "text", defaultValue: "Get started" },
        { name: "ctaHref", type: "text", defaultValue: "#" },
      ],
    },
  ],
};
