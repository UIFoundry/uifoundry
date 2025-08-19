import type { Block } from "payload";
import {
  BLOCK_GROUP_PRICING,
  BLOCK_SLUG_PRICING_5,
} from "~/payload/constants/blocks";

export const Pricing_5_Block: Block = {
  slug: BLOCK_SLUG_PRICING_5,
  interfaceName: "Pricing_5_Block",
  labels: { singular: "Pricing 5", plural: "Pricing 5's" },
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
          price: "$15/mo",
          highlight: false,
          features: ["1 project", "Community support"],
        },
        {
          name: "Pro",
          price: "$39/mo",
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
