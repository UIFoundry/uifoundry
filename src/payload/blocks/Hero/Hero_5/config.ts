import {
  BLOCK_GROUP_HERO,
  BLOCK_SLUG_HERO_5,
} from "~/payload/constants/blocks";
import type { Block } from "payload";
import mediaField from "~/payload/fields/mediaField";

export const Hero_5_Block: Block = {
  slug: BLOCK_SLUG_HERO_5,
  labels: { singular: "Hero 5", plural: "Hero 5's" },
  admin: { group: BLOCK_GROUP_HERO },
  interfaceName: "Hero_5_Block",
  fields: [
    {
      type: "collapsible",
      label: "New Update Alert",
      admin: { initCollapsed: true },
      fields: [
        {
          name: "alertLabel",
          label: "Alert Label",
          defaultValue: "New integrations",
          type: "text",
        },
        {
          name: "alertLink",
          label: "Alert Link (href)",
          defaultValue: "/integrations",
          type: "text",
        },
      ],
    },
    {
      name: "header",
      label: "Header",
      type: "text",
      defaultValue: "Ship faster with motion primitives",
      required: true,
    },
    {
      name: "subheader",
      label: "SubHeader",
      type: "text",
      defaultValue: "Floating shapes and layered depth for attention.",
    },
    {
      label: "Primary Call To Action",
      type: "collapsible",
      fields: [
        {
          name: "primaryCtaLabel",
          label: "Primary Call To Action: Label",
          type: "text",
          required: true,
          defaultValue: "Explore",
        },
        {
          name: "primaryCtaHref",
          label: "Primary Call To Action: Link (href)",
          type: "text",
          required: true,
          defaultValue: "/features",
        },
      ],
    },
    {
      label: "Secondary Call To Action",
      type: "collapsible",
      fields: [
        {
          name: "secondaryCtaLabel",
          label: "Secondary Call To Action: Label",
          type: "text",
          required: true,
          defaultValue: "Contact sales",
        },
        {
          name: "secondaryCtaHref",
          label: "Secondary Call To Action: Link (href)",
          type: "text",
          required: true,
          defaultValue: "/contact",
        },
      ],
    },
    {
      name: "stats",
      label: "Stats",
      type: "array",
      labels: { singular: "Stat", plural: "Stats" },
      admin: { initCollapsed: false },
      required: false,
      fields: [
        {
          name: "label",
          label: "Label",
          type: "text",
          required: true,
          defaultValue: "MRR",
        },
        {
          name: "value",
          label: "Value",
          type: "text",
          required: true,
          defaultValue: "$120k",
        },
        {
          name: "delta",
          label: "Delta",
          type: "text",
          required: false,
          defaultValue: "+8.4% MoM",
        },
      ],
      defaultValue: [
        { label: "MRR", value: "$120k", delta: "+8.4% MoM" },
        { label: "Users", value: "48,930", delta: "+2.1%" },
        { label: "NPS", value: "67", delta: "+4" },
        { label: "Latency", value: "112ms", delta: "-9ms" },
        { label: "Uptime", value: "99.98%", delta: "+0.02%" },
        { label: "ARPU", value: "$39.4", delta: "+$0.8" },
      ],
    },
    mediaField(),
  ],
};
