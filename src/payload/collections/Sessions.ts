import { type CollectionConfig } from "payload";
import { COLLECTION_SLUG_SESSIONS, COLLECTION_SLUG_USERS } from "../constants";

export const Sessions: CollectionConfig = {
  slug: COLLECTION_SLUG_SESSIONS,
  fields: [
    {
      name: "userId",
      type: "relationship",
      relationTo: COLLECTION_SLUG_USERS,
      required: true,
      hasMany: false,
    },
    {
      name: "token",
      type: "text",
      required: true,
      defaultValue: false,
    },
    {
      name: "expiresAt",
      type: "date",
      required: true,
      defaultValue: new Date(),
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
