import { type CollectionConfig } from "payload";

import { COLLECTION_SLUG_ACCOUNTS, COLLECTION_SLUG_USERS } from "../constants";

export const Accounts: CollectionConfig = {
  slug: COLLECTION_SLUG_ACCOUNTS,
  fields: [
    {
      name: "userId",
      type: "relationship",
      hasMany: false,
      relationTo: COLLECTION_SLUG_USERS,
      required: true,
    },
    {
      name: "accountId",
      type: "text",
      defaultValue: "",
      required: true,
    },
    {
      name: "providerId",
      type: "text",
      defaultValue: "",
      required: true,
    },
    {
      name: "accessToken",
      type: "text",
    },
    {
      name: "refreshToken",
      type: "text",
    },
    {
      name: "accessTokenExpiresAt",
      type: "date",
    },
    {
      name: "refreshTokenExpiresAt",
      type: "date",
    },
    {
      name: "scope",
      type: "text",
    },
    {
      name: "idToken",
      type: "text",
    },
    {
      name: "password",
      type: "text",
    },
  ],
};
