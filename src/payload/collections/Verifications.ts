import { type CollectionConfig } from "payload";

import { COLLECTION_SLUG_VERIFICATIONS } from "../constants";

export const Verifications: CollectionConfig = {
  slug: COLLECTION_SLUG_VERIFICATIONS,
  fields: [
    {
      name: "identifier",
      type: "text",
      defaultValue: "",
      required: true,
    },
    {
      name: "value",
      type: "text",
      defaultValue: "",
      required: true,
    },
    {
      name: "expiresAt",
      type: "date",
      defaultValue: new Date(),
      required: true,
    },
  ],
};
