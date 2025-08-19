import type { Block } from "payload";
import {
  BLOCK_GROUP_TEAMS,
  BLOCK_SLUG_TEAMS_6,
} from "~/payload/constants/blocks";
import { COLLECTION_SLUG_MEDIA } from "~/payload/constants";
import socialLinksField from "~/payload/fields/socialLinksField";

export const Teams_6_Block: Block = {
  slug: BLOCK_SLUG_TEAMS_6,
  interfaceName: "Teams_6_Block",
  labels: { singular: "Teams 6", plural: "Teams 6's" },
  admin: { group: BLOCK_GROUP_TEAMS },
  fields: [
    { name: "heading", type: "text", required: true, defaultValue: "Our team" },
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
