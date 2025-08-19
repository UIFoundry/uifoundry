import type { Block } from "payload";
import {
  BLOCK_GROUP_TEAMS,
  BLOCK_SLUG_TEAMS_5,
} from "~/payload/constants/blocks";
import { COLLECTION_SLUG_MEDIA } from "~/payload/constants";
import socialLinksField from "~/payload/fields/socialLinksField";

export const Teams_5_Block: Block = {
  slug: BLOCK_SLUG_TEAMS_5,
  interfaceName: "Teams_5_Block",
  labels: { singular: "Teams 5", plural: "Teams 5's" },
  admin: { group: BLOCK_GROUP_TEAMS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Our people",
    },
    {
      name: "members",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "role", type: "text", required: true },
        { name: "bio", type: "textarea" },
        { name: "avatar", type: "upload", relationTo: COLLECTION_SLUG_MEDIA },
        socialLinksField({ name: "links" }),
      ],
    },
  ],
};
