import { z } from "zod";
import { COLLECTION_SLUG_THEMES } from "~/payload/constants";
import { themeStylePropsSchema } from "~/payload/globals/SiteConfig/admin/theme";
import {
	defaultDarkThemeStyles,
	defaultLightThemeStyles,
} from "~/payload/globals/SiteConfig/admin/themeConfig";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

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
				const newTheme = await ctx.payload.create({
					collection: COLLECTION_SLUG_THEMES,
					data: {
						name: input.name,
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
					throw new Error("unable to create new theme");
				}
				return newTheme;
			} catch (err) {
				console.error("error creating theme caught", err);
				return;
			}
		}),
});
