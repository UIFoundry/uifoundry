import type { GlobalConfig } from "payload";

import { blocks } from "~/payload/blocks/Footer";
import { GLOBAL_SLUG_FOOTER } from "~/payload/constants/globals";

export const FooterGlobal: GlobalConfig = {
  slug: GLOBAL_SLUG_FOOTER,
  fields: [
    {
      name: "footer",
      type: "blocks",
      blocks,
      maxRows: 1,
      minRows: 1,
      required: true,
    },
  ],
};
