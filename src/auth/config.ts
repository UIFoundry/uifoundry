import { admin, apiKey } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { USER_ROLES } from "./permissions";

export const betterAuthPlugins = [
	admin({
		defaultRole: USER_ROLES.user,
		adminRoles: [USER_ROLES.admin],
	}),
	apiKey(),
	nextCookies(),
];
export type BetterAuthPlugins = typeof betterAuthPlugins;
