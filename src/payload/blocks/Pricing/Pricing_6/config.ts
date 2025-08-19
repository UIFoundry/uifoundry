import type { Block } from "payload";
import {
  BLOCK_GROUP_PRICING,
  BLOCK_SLUG_PRICING_6,
} from "~/payload/constants/blocks";

export const Pricing_6_Block: Block = {
  slug: BLOCK_SLUG_PRICING_6,
  interfaceName: "Pricing_6_Block",
  labels: { singular: "Pricing 6", plural: "Pricing 6's" },
  admin: { group: BLOCK_GROUP_PRICING },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Transparent pricing",
    },
    {
      name: "subheading",
      type: "text",
      required: false,
      defaultValue: "No hidden fees. Cancel anytime.",
    },
    { name: "billingCycleLabel", type: "text", defaultValue: "Billing cycle" },
    { name: "monthlyLabel", type: "text", defaultValue: "Monthly" },
    { name: "yearlyLabel", type: "text", defaultValue: "Yearly" },
    { name: "yearlyNote", type: "text", defaultValue: "Save 20%" },
    {
      name: "defaultCycle",
      type: "select",
      defaultValue: "monthly",
      options: ["monthly", "yearly"],
    },
    {
      name: "plans",
      type: "array",
      required: true,
      labels: { singular: "Plan", plural: "Plans" },
      defaultValue: [
        {
          name: "Basic",
          monthly: "$15",
          yearly: "$150",
          features: ["Basic analytics", "Email support"],
        },
        {
          name: "Business",
          monthly: "$49",
          yearly: "$490",
          features: ["Advanced analytics", "Priority support"],
        },
      ],
      fields: [
        { name: "name", type: "text", required: true },
        { name: "monthly", type: "text", required: true },
        { name: "yearly", type: "text", required: true },
        {
          name: "features",
          type: "array",
          labels: { singular: "Feature", plural: "Features" },
          defaultValue: ["Feature A", "Feature B"],
          fields: [{ name: "feature", type: "text", required: true }],
        },
        { name: "ctaLabel", type: "text", defaultValue: "Choose plan" },
        { name: "ctaHref", type: "text", defaultValue: "#" },
      ],
    },
  ],
};
