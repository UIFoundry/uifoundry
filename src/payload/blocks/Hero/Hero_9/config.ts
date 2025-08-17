import {
  BLOCK_GROUP_HERO,
  BLOCK_SLUG_HERO_9,
} from "~/payload/constants/blocks";
import type { Block } from "payload";

export const Hero_9_Block: Block = {
  slug: BLOCK_SLUG_HERO_9,
  labels: { singular: "Hero 9", plural: "Hero 9's" },
  admin: { group: BLOCK_GROUP_HERO },
  interfaceName: "Hero_9_Block",
  fields: [
    {
      type: "collapsible",
      label: "New Update Alert",
      admin: { initCollapsed: true },
      fields: [
        {
          name: "alertLabel",
          label: "Alert Label",
          defaultValue: "Now with Code Tabs",
          type: "text",
        },
        {
          name: "alertLink",
          label: "Alert Link (href)",
          defaultValue: "/changelog",
          type: "text",
        },
      ],
    },
    {
      name: "header",
      label: "Header",
      type: "text",
      defaultValue: "Build APIs in minutes, not weeks",
      required: true,
    },
    {
      name: "subheader",
      label: "SubHeader",
      type: "text",
      defaultValue:
        "Developer-first hero with live code samples. Switch languages to see how it works.",
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
          defaultValue: "Get Started",
        },
        {
          name: "primaryCtaHref",
          label: "Primary Call To Action: Link (href)",
          type: "text",
          required: true,
          defaultValue: "/getting-started",
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
          defaultValue: "API Docs",
        },
        {
          name: "secondaryCtaHref",
          label: "Secondary Call To Action: Link (href)",
          type: "text",
          required: true,
          defaultValue: "/docs/api",
        },
      ],
    },
    {
      name: "codeSamples",
      label: "Code Samples",
      type: "array",
      labels: { singular: "Sample", plural: "Samples" },
      required: true,
      admin: { initCollapsed: false },
      fields: [
        {
          name: "label",
          label: "Tab Label",
          type: "text",
          required: true,
          defaultValue: "TypeScript",
        },
        {
          name: "language",
          label: "Language",
          type: "select",
          defaultValue: "ts",
          options: [
            { label: "TypeScript", value: "ts" },
            { label: "JavaScript", value: "js" },
            { label: "Bash", value: "bash" },
            { label: "JSON", value: "json" },
          ],
        },
        {
          name: "code",
          label: "Code",
          type: "textarea",
          required: true,
          defaultValue:
            "import { Client } from '@acme/sdk'\nconst client = new Client({ apiKey: process.env.ACME_API_KEY })\nconst res = await client.invoices.list()\nconsole.log(res)",
        },
      ],
      defaultValue: [
        {
          label: "TypeScript",
          language: "ts",
          code: "import { Client } from '@acme/sdk'\nconst client = new Client({ apiKey: process.env.ACME_API_KEY })\nconst res = await client.invoices.list()\nconsole.log(res)",
        },
        {
          label: "Bash",
          language: "bash",
          code: "curl -H 'Authorization: Bearer $ACME_API_KEY' https://api.acme.dev/invoices",
        },
      ],
    },
    {
      name: "showLineNumbers",
      label: "Show line numbers",
      type: "checkbox",
      defaultValue: true,
    },
  ],
};
