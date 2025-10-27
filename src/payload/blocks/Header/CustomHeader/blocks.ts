import type { Block } from "payload";

import {
	BLOCK_SLUG_HEADER_BRAND_LOGO,
	BLOCK_SLUG_HEADER_MENU_BUTTON,
	BLOCK_SLUG_HEADER_MENU_ITEMS,
} from "~/payload/constants/blocks";

import HeaderBrandLogo from "./BrandLogo";
import { HeaderBrandLogoBlock } from "./BrandLogo/config";
import HeaderMenuButton from "./MenuButton";
import { HeaderMenuButtonBlock } from "./MenuButton/config";
import HeaderMenuItems from "./MenuItems";
import { HeaderMenuItemsBlock } from "./MenuItems/config";

export const blocks: Block[] = [
	HeaderMenuItemsBlock,
	HeaderMenuButtonBlock,
	HeaderBrandLogoBlock,
];

export const blockComponents = {
	[BLOCK_SLUG_HEADER_BRAND_LOGO]: HeaderBrandLogo,
	[BLOCK_SLUG_HEADER_MENU_BUTTON]: HeaderMenuButton,
	[BLOCK_SLUG_HEADER_MENU_ITEMS]: HeaderMenuItems,
};
