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
				dark: themeStylePropsSchema,
				light: themeStylePropsSchema,
			}),
		)
		.mutation(async ({ ctx, input }) => {
			try {
				if (
					!hasPermission({
						action: "create",
						resource: COLLECTION_SLUG_THEMES,
						user: ctx.user,
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
							dark: {
								...defaultDarkThemeStyles,
								...input.dark,
							},
							light: {
								...defaultLightThemeStyles,
								...input.light,
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
		.query(async ({ ctx, input }) => {
			try {
				const theme = await ctx.payload.findByID({
					id: input.id,
					collection: COLLECTION_SLUG_THEMES,
				});

				if (
					!hasPermission({
						action: "read",
						data: theme,
						resource: COLLECTION_SLUG_THEMES,
						user: ctx.user,
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
				name: z.string().optional(),
				type: z.enum([THEME_TYPES.user, THEME_TYPES.template]).optional(),
				mode: z.enum(["light", "dark"]).default("light"),
				private: z.boolean().optional(),
				styles: themeStylePropsSchema,
			}),
		)
		.mutation(async ({ ctx, input }) => {
			try {
				const theme = await ctx.payload.findByID({
					id: input.id,
					collection: COLLECTION_SLUG_THEMES,
				});

				if (
					!hasPermission({
						action: "update",
						data: theme,
						resource: COLLECTION_SLUG_THEMES,
						user: ctx.user,
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
					id: input.id,
					collection: COLLECTION_SLUG_THEMES,
					data: {
						...theme,
						name: input.name ?? theme.name,
						type: input.type ?? theme.type,
						private: input.private ?? theme.private,
						styles:
							input.mode === "light"
								? {
									dark: darkTheme,
									light: {
										...lightTheme,
										...input.styles,
									},
								}
								: {
									dark: {
										...darkTheme,
										...input.styles,
									},
									light: lightTheme,
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
