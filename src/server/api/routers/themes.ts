import { z } from "zod";
import { hasPermission } from "~/auth/permissions";
import { COLLECTION_SLUG_THEMES } from "~/payload/constants";
import { themeStylePropsSchema } from "~/payload/globals/SiteConfig/admin/theme";
import {
	defaultDarkThemeStyles,
	defaultLightThemeStyles,
} from "~/payload/globals/SiteConfig/admin/themeConfig";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { err, ok } from "~/server/dal";

export const themesRouter = createTRPCRouter({
	create: privateProcedure
		.input(
			z.object({
				name: z.string(),
				light: themeStylePropsSchema,
				dark: themeStylePropsSchema,
			}),
		)
		.mutation(async ({ input, ctx }) => {
			try {
				if (
					!hasPermission({
						user: ctx.user,
						resource: COLLECTION_SLUG_THEMES,
						action: "create",
					})
				) {
					return err({ type: "no-access" });
				}
				const newTheme = await ctx.payload.create({
					collection: COLLECTION_SLUG_THEMES,
					data: {
						name: input.name,
						owner: ctx.user.id,
						private: false,
						styles: {
							light: {
								...defaultLightThemeStyles,
								...input.light,
							},
							dark: {
								...defaultDarkThemeStyles,
								...input.dark,
							},
						},
					},
				});
				if (!newTheme) {
					return err({ type: "payload" });
				}
				return ok(newTheme);
			} catch (error) {
				console.error("error creating theme caught", error);
				return err();
			}
		}),
});
