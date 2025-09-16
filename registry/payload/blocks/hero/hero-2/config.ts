import {
  BLOCK_GROUP_HERO,
  BLOCK_SLUG_HERO_2,
} from "@/registry/default/lib/constants/blocks";
import type { Block } from "payload";
import headerField from "@/registry/default/lib/fields/header/config";
import subHeaderField from "@/registry/default/lib/fields/subheader/config";
import mediaField from "@/registry/default/lib/fields/media/config";
import callToActionPair from "@/registry/default/lib/fields/cta-pair/config";

export const Hero_2_Block: Block = {
  slug: BLOCK_SLUG_HERO_2,
  labels: {
    singular: "Hero 2",
    plural: "Hero 2's",
  },
  admin: {
    group: BLOCK_GROUP_HERO,
  },
  interfaceName: "Hero_2_Block",
  fields: [
    headerField(),
    subHeaderField(),
    mediaField({ name: "background", label: "Background Media" }),
    callToActionPair(),
  ],
};
