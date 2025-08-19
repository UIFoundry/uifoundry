import type { Block } from "payload";
import {
  BLOCK_GROUP_TEAMS,
  BLOCK_SLUG_TEAMS_7,
} from "~/payload/constants/blocks";
import { COLLECTION_SLUG_MEDIA } from "~/payload/constants";
import socialLinksField from "~/payload/fields/socialLinksField";

export const Teams_7_Block: Block = {
  slug: BLOCK_SLUG_TEAMS_7,
  interfaceName: "Teams_7_Block",
  labels: { singular: "Teams 7", plural: "Teams 7's" },
  admin: { group: BLOCK_GROUP_TEAMS },
  fields: [
    { name: "heading", type: "text", required: true, defaultValue: "Team" },
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
