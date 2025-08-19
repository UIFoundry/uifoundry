import type { Block } from "payload";
import {
  BLOCK_GROUP_TEAMS,
  BLOCK_SLUG_TEAMS_10,
} from "~/payload/constants/blocks";
import { COLLECTION_SLUG_MEDIA } from "~/payload/constants";
import socialLinksField from "~/payload/fields/socialLinksField";

export const Teams_10_Block: Block = {
  slug: BLOCK_SLUG_TEAMS_10,
  interfaceName: "Teams_10_Block",
  labels: { singular: "Teams 10", plural: "Teams 10's" },
  admin: { group: BLOCK_GROUP_TEAMS },
  fields: [
    { name: "heading", type: "text", required: true, defaultValue: "The team" },
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
