import { GLOBAL_SLUG_FOOTER, GLOBAL_SLUG_HEADER } from "../constants/globals";
import Footer, { FooterGlobal } from "./Footer";
import Header, { HeaderGlobal } from "./Header";
import { SiteConfigGlobal } from "./SiteConfig/config";

export const globals = [HeaderGlobal, FooterGlobal, SiteConfigGlobal];

export const globalComponents = {
	[GLOBAL_SLUG_FOOTER]: Footer,
	[GLOBAL_SLUG_HEADER]: Header,
};
