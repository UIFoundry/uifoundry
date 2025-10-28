import type { Block } from "payload";

import { COLLECTION_SLUG_MEDIA } from "~/payload/constants";
import { BLOCK_SLUG_TEAMS_1_MEMBERS } from "~/payload/constants/blocks";

export const Teams_1_Members_Block: Block = {
  slug: BLOCK_SLUG_TEAMS_1_MEMBERS,
  fields: [
    {
      name: "members",
      type: "array",
      defaultValue: [],
      fields: [
        {
          name: "name",
          type: "text",
          label: "Member Name",
          required: true,
        },
        {
          name: "role",
          type: "text",
          label: "Member Role",
          required: true,
        },
        {
          name: "avatar",
          type: "upload",
          relationTo: COLLECTION_SLUG_MEDIA,
        },
      ],
      labels: {
        plural: "Team Memnbers",
        singular: "Team Member",
      },
      required: true,
    },
  ],
  interfaceName: "Teams_1_Members_Block",
  labels: {
    plural: "Teams 1 - Members'",
    singular: "Teams 1 - Members",
  },
};
