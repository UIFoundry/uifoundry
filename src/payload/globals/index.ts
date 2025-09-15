import { GLOBAL_SLUG_FOOTER, GLOBAL_SLUG_HEADER } from "../constants/globals";
import Footer, { FooterGlobal } from "./Footer";
import { HeaderGlobal } from "./Header/config";
import Header from "./Header";
import { SiteConfigGlobal } from "./SiteConfig/config";

export const globals = [HeaderGlobal, FooterGlobal, SiteConfigGlobal];

export const globalComponents = {
	[GLOBAL_SLUG_HEADER]: Header,
	[GLOBAL_SLUG_FOOTER]: Footer,
};
