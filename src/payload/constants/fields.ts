export const TABLE_COL_ALIGNMENT = {
  left: "left",
  right: "right",
  center: "center",
} as const;
export type TableColAlign =
  (typeof TABLE_COL_ALIGNMENT)[keyof typeof TABLE_COL_ALIGNMENT];
