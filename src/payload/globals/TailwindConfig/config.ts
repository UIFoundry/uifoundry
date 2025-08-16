import type { GlobalConfig } from "payload";
import { GLOBAL_SLUG_TAILWIND } from "~/payload/constants/globals";
import colorField from "~/payload/fields/colorField";
import { env } from "~/env.mjs";
import { AUTOSAVE_INTERVAL } from "~/payload/constants";

export const TailwindConfigGlobal: GlobalConfig = {
  slug: GLOBAL_SLUG_TAILWIND,
  label: "Tailwind Config",
  admin: {
    livePreview: {
      url: `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/preview/home?draft=true`,
    },
  },
  versions: {
    drafts: {
      autosave: {
        interval: AUTOSAVE_INTERVAL,
      },
    },
  },
  fields: [
    {
      label: "Theme",
      type: "collapsible",
      fields: [
        {
          name: "radius",
          type: "number",
          admin: {
            step: 0.25,
          },
          defaultValue: 0.625,
        },
      ],
    },
    {
      label: "Colors",
      type: "collapsible",
      admin: {
        initCollapsed: false,
      },
      fields: [
        colorField({
          name: "background",
          label: "Background",
          description: "Base page background color.",
        }),
        colorField({
          name: "foreground",
          label: "Foreground",
          description: "Primary text color on the background.",
        }),
        colorField({
          name: "card",
          label: "Card",
          description: "Card surface background.",
        }),
        colorField({
          name: "card-foreground",
          label: "Card Foreground",
          description: "Text color on card surfaces.",
        }),
        colorField({
          name: "popover",
          label: "Popover",
          description: "Popover/menu surface background.",
        }),
        colorField({
          name: "popover-foreground",
          label: "Popover Foreground",
          description: "Text color on popovers.",
        }),
        colorField({
          name: "primary",
          label: "Primary",
          description: "Primary brand color for CTAs and highlights.",
        }),
        colorField({
          name: "primary-foreground",
          label: "Primary Foreground",
          description: "Text/icon color on primary surfaces.",
        }),
        colorField({
          name: "secondary",
          label: "Secondary",
          description: "Secondary surface/background accents.",
        }),
        colorField({
          name: "secondary-foreground",
          label: "Secondary Foreground",
          description: "Text/icon color on secondary surfaces.",
        }),
        colorField({
          name: "muted",
          label: "Muted",
          description: "Muted surface/background (subtle).",
        }),
        colorField({
          name: "muted-foreground",
          label: "Muted Foreground",
          description: "Text color on muted surfaces.",
        }),
        colorField({
          name: "accent",
          label: "Accent",
          description: "Neutral accent surface/background.",
        }),
        colorField({
          name: "accent-foreground",
          label: "Accent Foreground",
          description: "Text/icon color on accent surfaces.",
        }),
        colorField({
          name: "destructive",
          label: "Destructive",
          description: "Destructive/error surface/background.",
        }),
        colorField({
          name: "destructive-foreground",
          label: "Destructive Foreground",
          description: "Text/icon color on destructive surfaces.",
        }),
        colorField({
          name: "border",
          label: "Border",
          description: "Border color for inputs and UI chrome.",
        }),
        colorField({
          name: "input",
          label: "Input",
          description: "Input background/border color.",
        }),
        colorField({
          name: "ring",
          label: "Ring",
          description: "Focus ring color.",
        }),
        colorField({
          name: "chart-1",
          label: "Chart 1",
          description: "First categorical chart color.",
        }),
        colorField({
          name: "chart-2",
          label: "Chart 2",
          description: "Second categorical chart color.",
        }),
        colorField({
          name: "chart-3",
          label: "Chart 3",
          description: "Third categorical chart color.",
        }),
        colorField({
          name: "chart-4",
          label: "Chart 4",
          description: "Fourth categorical chart color.",
        }),
        colorField({
          name: "chart-5",
          label: "Chart 5",
          description: "Fifth categorical chart color.",
        }),
        colorField({
          name: "sidebar",
          label: "Sidebar",
          description: "Sidebar surface background.",
        }),
        colorField({
          name: "sidebar-foreground",
          label: "Sidebar Foreground",
          description: "Text/icon color on sidebar surfaces.",
        }),
        colorField({
          name: "sidebar-primary",
          label: "Sidebar Primary",
          description: "Primary color for sidebar highlights.",
        }),
        colorField({
          name: "sidebar-primary-foreground",
          label: "Sidebar Primary Foreground",
          description: "Text/icon color on sidebar primary surfaces.",
        }),
        colorField({
          name: "sidebar-accent",
          label: "Sidebar Accent",
          description: "Accent surface in sidebar.",
        }),
        colorField({
          name: "sidebar-accent-foreground",
          label: "Sidebar Accent Foreground",
          description: "Text/icon color on sidebar accent surfaces.",
        }),
        colorField({
          name: "sidebar-border",
          label: "Sidebar Border",
          description: "Border color in sidebar UI.",
        }),
        colorField({
          name: "sidebar-ring",
          label: "Sidebar Ring",
          description: "Focus ring color within sidebar.",
        }),
      ],
    },
  ],
};
