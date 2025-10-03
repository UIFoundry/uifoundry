import { z } from "zod";
import { hasPermission } from "~/auth/permissions";
import { COLLECTION_SLUG_THEMES } from "~/payload/constants";
import { THEME_TYPES } from "~/payload/constants/themes";
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

	findById: privateProcedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.query(async ({ input, ctx }) => {
			try {
				const theme = await ctx.payload.findByID({
					collection: COLLECTION_SLUG_THEMES,
					id: input.id,
				});

				if (
					!hasPermission({
						user: ctx.user,
						resource: COLLECTION_SLUG_THEMES,
						action: "read",
						data: theme,
					})
				) {
					return err({ type: "no-access" });
				}

				return ok(theme);
			} catch (error) {
				console.error("error reading theme(s): ", error);
				return err();
			}
		}),

	update: privateProcedure
		.input(
			z.object({
				id: z.string(),
				styles: themeStylePropsSchema,
				mode: z.enum(["light", "dark"]).default("light"),
				name: z.string().optional(),
				type: z.enum([THEME_TYPES.user, THEME_TYPES.template]).optional(),
				private: z.boolean().optional(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			try {
				const theme = await ctx.payload.findByID({
					collection: COLLECTION_SLUG_THEMES,
					id: input.id,
				});

				if (
					!hasPermission({
						user: ctx.user,
						resource: COLLECTION_SLUG_THEMES,
						action: "update",
						data: theme,
					})
				) {
					return err({ type: "no-access" });
				}

				const lightTheme = (
					theme.styles as Record<string, Record<string, string>>
				).light!;
				const darkTheme = (
					theme.styles as Record<string, Record<string, string>>
				).dark!;

				await ctx.payload.update({
					collection: COLLECTION_SLUG_THEMES,
					id: input.id,
					data: {
						...theme,
						name: input.name ?? theme.name,
						type: input.type ?? theme.type,
						private: input.private ?? theme.private,
						styles:
							input.mode === "light"
								? {
									light: {
										...lightTheme,
										...input.styles,
									},
									dark: darkTheme,
								}
								: {
									light: lightTheme,
									dark: {
										...darkTheme,
										...input.styles,
									},
								},
					},
				});

				return ok(theme);
			} catch (error) {
				console.error("error reading theme(s): ", error);
				return err();
			}
		}),
});
