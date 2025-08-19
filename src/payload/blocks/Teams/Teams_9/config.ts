import type { Block } from "payload";
import {
  BLOCK_GROUP_TEAMS,
  BLOCK_SLUG_TEAMS_9,
} from "~/payload/constants/blocks";
import { COLLECTION_SLUG_MEDIA } from "~/payload/constants";
import socialLinksField from "~/payload/fields/socialLinksField";

export const Teams_9_Block: Block = {
  slug: BLOCK_SLUG_TEAMS_9,
  interfaceName: "Teams_9_Block",
  labels: { singular: "Teams 9", plural: "Teams 9's" },
  admin: { group: BLOCK_GROUP_TEAMS },
  fields: [
    { name: "heading", type: "text", required: true, defaultValue: "Meet us" },
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
