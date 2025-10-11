import type { Block } from "payload";
import {
  BLOCK_GROUP_HEADERS,
  BLOCK_SLUG_HEADER_BRAND_LOGO,
} from "@/registry/default/lib/constants/blocks";
import { FLEX_ALIGNMENT } from "@/registry/default/lib/constants";
import selectEnumField from "@/registry/default/lib/fields/select-enum-field/config";
import mediaField from "@/registry/default/lib/fields/media/config";

export const HeaderBrandLogoBlock: Block = {
  slug: BLOCK_SLUG_HEADER_BRAND_LOGO,
  interfaceName: "HeaderBrandLogoBlock",
  labels: {
    singular: "Brand Logo",
    plural: "Brand Logos",
  },
  admin: {
    group: BLOCK_GROUP_HEADERS,
  },
  fields: [
    selectEnumField(FLEX_ALIGNMENT, {
      name: "alignment",
      defaultValue: FLEX_ALIGNMENT.left,
    }),
    {
      name: "href",
      label: "Target Link (href)",
      type: "text",
      required: true,
      defaultValue: "/home",
    },
    mediaField({
      name: "media",
    }),
  ],
};
