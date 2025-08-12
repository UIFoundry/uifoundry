import { GLOBAL_SLUG_FOOTER, GLOBAL_SLUG_HEADER } from "../constants/globals";
import Footer, { FooterGlobal } from "./Footer";
import Header, { HeaderGlobal } from "./Header";
import { TailwindConfigGlobal } from "./TailwindConfig/config";

export const globals = [HeaderGlobal, FooterGlobal, TailwindConfigGlobal]

export const globalComponents = {
	[GLOBAL_SLUG_HEADER]: Header,
	[GLOBAL_SLUG_FOOTER]: Footer,
}
