import { type CollectionConfig } from "payload";

import { COLLECTION_SLUG_SESSIONS, COLLECTION_SLUG_USERS } from "../constants";

export const Sessions: CollectionConfig = {
  slug: COLLECTION_SLUG_SESSIONS,
  fields: [
    {
      name: "userId",
      type: "relationship",
      hasMany: false,
      relationTo: COLLECTION_SLUG_USERS,
      required: true,
    },
    {
      name: "token",
      type: "text",
      defaultValue: false,
      required: true,
    },
    {
      name: "expiresAt",
      type: "date",
      defaultValue: new Date(),
      required: true,
    },
    {
      name: "ipAddress",
      type: "text",
    },
    {
      name: "userAgent",
      type: "text",
    },
  ],
};
