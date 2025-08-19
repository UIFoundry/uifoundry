import type { Block } from "payload";
import {
  BLOCK_GROUP_TEAMS,
  BLOCK_SLUG_TEAMS_2,
} from "~/payload/constants/blocks";
import { COLLECTION_SLUG_MEDIA } from "~/payload/constants";
import socialLinksField from "~/payload/fields/socialLinksField";

export const Teams_2_Block: Block = {
  slug: BLOCK_SLUG_TEAMS_2,
  interfaceName: "Teams_2_Block",
  labels: { singular: "Teams 2", plural: "Teams 2's" },
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
      required: true,
      labels: { singular: "Member", plural: "Members" },
      defaultValue: [
        { name: "Alex Johnson", role: "Founder", bio: "Product & strategy" },
        { name: "Taylor Kim", role: "Engineer", bio: "Full‑stack dev" },
      ],
      fields: [
        { name: "name", type: "text", required: true, label: "Name" },
        { name: "role", type: "text", required: true, label: "Role" },
        { name: "bio", type: "textarea", required: false, label: "Bio" },
        { name: "avatar", type: "upload", relationTo: COLLECTION_SLUG_MEDIA },
        socialLinksField({
          name: "links",
          labels: { singular: "Link", plural: "Links" },
        }),
      ],
    },
  ],
};
