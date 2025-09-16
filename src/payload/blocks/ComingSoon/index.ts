import type { Block } from "payload";
import { ComingSoon_1_Block } from "./ComingSoon_1/config";
import ComingSoon_1 from "./ComingSoon_1";

export const blocks: Block[] = [ComingSoon_1_Block];

export const blockComponents = {
  coming_soon_1: ComingSoon_1,
};
