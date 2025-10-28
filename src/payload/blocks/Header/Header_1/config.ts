import type { Block } from "payload";

import {
  BLOCK_GROUP_HEADERS,
  BLOCK_SLUG_HEADER_1,
} from "~/payload/constants/blocks";
import mediaField from "~/payload/fields/media/config";

export const Header_1_Block: Block = {
  slug: BLOCK_SLUG_HEADER_1,
  admin: {
    group: BLOCK_GROUP_HEADERS,
  },
  fields: [
    {
      type: "collapsible",
      fields: [
        mediaField({
          name: "brandLogo",
          label: "Logo Image",
        }),
        {
          name: "logoHref",
          type: "text",
          defaultValue: "/",
          label: "Logo Link (href)",
          required: true,
        },
      ],
      label: "Brand Logo",
    },
    {
      type: "collapsible",
      fields: [
        {
          name: "menuItems",
          type: "array",
          defaultValue: [
            {
              href: "/features",
              label: "Features",
            },
            {
              href: "/pricing",
              label: "Pricing",
            },
            {
              href: "/about",
              label: "About",
            },
          ],
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
              admin: {
                placeholder: "/features | #features",
              },
              label: "Href",
              required: true,
            },
          ],
          labels: {
            plural: "Menu Items",
            singular: "Menu Item",
          },
          maxRows: 10,
          minRows: 0,
          required: true,
        },
      ],
      label: "Menu Items",
    },
    {
      type: "collapsible",
      fields: [
        {
          name: "actionButtons",
          type: "array",
          defaultValue: [
            {
              href: "/auth/sign-in",
              label: "Login",
              variant: "outline",
            },
            {
              href: "/auth/sign-up",
              label: "Sign Up",
              variant: "default",
            },
          ],
          fields: [
            {
              name: "label",
              type: "text",
              label: "Button Label",
              required: true,
            },
            {
              name: "href",
              type: "text",
              label: "Button Link (href)",
              required: true,
            },
            {
              name: "variant",
              type: "select",
              defaultValue: "default",
              label: "Button Variant",
              options: [
                { label: "Default", value: "default" },
                { label: "Outline", value: "outline" },
                { label: "Ghost", value: "ghost" },
              ],
              required: true,
            },
          ],
          labels: {
            plural: "Action Buttons",
            singular: "Action Button",
          },
          maxRows: 3,
          minRows: 0,
        },
      ],
      label: "Action Buttons",
    },
  ],
  interfaceName: "Header_1_Block",
  labels: {
    plural: "Header 1's",
    singular: "Header 1",
  },
};
