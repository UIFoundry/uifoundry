import type { Block } from "payload";
import {
  BLOCK_GROUP_FEATURES,
  BLOCK_SLUG_FEATURES_10,
} from "~/payload/constants/blocks";
import iconField from "~/payload/fields/iconField";

export const Features_10_Block: Block = {
  slug: BLOCK_SLUG_FEATURES_10,
  interfaceName: "Features_10_Block",
  labels: { singular: "Features 10", plural: "Features 10's" },
  admin: { group: BLOCK_GROUP_FEATURES },
  fields: [
    {
      name: "header",
      type: "text",
      required: true,
      defaultValue: "Showcase of features",
    },
    {
      name: "subheader",
      type: "text",
      defaultValue: "A smooth, infinite carousel",
    },
    {
      name: "scrollDirection",
      label: "Scroll Direction",
      type: "select",
      defaultValue: "left",
      options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
    },
    {
      name: "items",
      type: "array",
      labels: { singular: "Item", plural: "Items" },
      minRows: 4,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          defaultValue: "Feature",
        },
        { name: "description", type: "text" },
        iconField(),
      ],
      defaultValue: [
        { title: "Realtime", description: "Live updates", icon: "AlarmClock" },
        { title: "Offline", description: "Works anywhere", icon: "WifiOff" },
        { title: "CLI", description: "Automate tasks", icon: "Terminal" },
        { title: "SDK", description: "Build quickly", icon: "Boxes" },
      ],
    },
  ],
};
