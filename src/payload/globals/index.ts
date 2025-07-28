import { GLOBAL_SLUG_FOOTER, GLOBAL_SLUG_HEADER } from "../constants/globals";
import Footer, { FooterGlobal } from "./Footer";
import Header, { HeaderGlobal } from "./Header";

export const globals = [HeaderGlobal, FooterGlobal]

export const globalComponents = {
	[GLOBAL_SLUG_HEADER]: Header,
	[GLOBAL_SLUG_FOOTER]: Footer,
}
