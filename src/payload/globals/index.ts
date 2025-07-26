import { GLOBAL_SLUG_HEADER } from "../constants/globals";
import Header, { HeaderGlobal } from "./Header";

export const globals = [HeaderGlobal]

export const globalComponents = {
	[GLOBAL_SLUG_HEADER]: Header,
}
