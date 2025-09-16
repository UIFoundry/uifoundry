import type { Block } from "payload";
import { HeaderMenuItemsBlock } from "./MenuItems/config";
import HeaderMenuItems from "./MenuItems";
import { HeaderMenuButtonBlock } from "./MenuButton/config";
import HeaderMenuButton from "./MenuButton";
import { HeaderBrandLogoBlock } from "./BrandLogo/config";
import HeaderBrandLogo from "./BrandLogo";

import {
	BLOCK_SLUG_HEADER_BRAND_LOGO,
	BLOCK_SLUG_HEADER_MENU_BUTTON,
	BLOCK_SLUG_HEADER_MENU_ITEMS,
} from "~/payload/constants/blocks";

export const blocks: Block[] = [
	HeaderMenuItemsBlock,
	HeaderMenuButtonBlock,
	HeaderBrandLogoBlock,
];

export const blockComponents = {
	[BLOCK_SLUG_HEADER_MENU_ITEMS]: HeaderMenuItems,
	[BLOCK_SLUG_HEADER_MENU_BUTTON]: HeaderMenuButton,
	[BLOCK_SLUG_HEADER_BRAND_LOGO]: HeaderBrandLogo,
};
