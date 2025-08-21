import { type CollectionConfig } from "payload";
import { COLLECTION_SLUG_ACCOUNTS, COLLECTION_SLUG_USERS } from "../constants";

export const Accounts: CollectionConfig = {
  slug: COLLECTION_SLUG_ACCOUNTS,
  fields: [
    {
      name: "userId",
      type: "relationship",
      relationTo: COLLECTION_SLUG_USERS,
      required: true,
      hasMany: false,
    },
    {
      name: "accountId",
      type: "text",
      required: true,
      defaultValue: "",
    },
    {
      name: "providerId",
      type: "text",
      required: true,
      defaultValue: "",
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
