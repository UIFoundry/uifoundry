import type { Block } from "payload";
import {
  BLOCK_GROUP_TEAMS,
  BLOCK_SLUG_TEAMS_4,
} from "~/payload/constants/blocks";
import { COLLECTION_SLUG_MEDIA } from "~/payload/constants";
import socialLinksField from "~/payload/fields/socialLinksField";

export const Teams_4_Block: Block = {
  slug: BLOCK_SLUG_TEAMS_4,
  interfaceName: "Teams_4_Block",
  labels: { singular: "Teams 4", plural: "Teams 4's" },
  admin: { group: BLOCK_GROUP_TEAMS },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Meet the team",
    },
    {
      name: "members",
      type: "array",
      labels: { singular: "Member", plural: "Members" },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "role", type: "text", required: true },
        { name: "bio", type: "textarea" },
        { name: "avatar", type: "upload", relationTo: COLLECTION_SLUG_MEDIA },
        socialLinksField({
          name: "links",
          labels: { singular: "Link", plural: "Links" },
        }),
      ],
    },
  ],
};
