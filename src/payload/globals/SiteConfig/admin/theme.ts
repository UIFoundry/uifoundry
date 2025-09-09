import { z } from "zod";
import { defaultLightThemeStyles } from "./themeConfig";

export const themeStylePropsSchema = z.object({
	background: z
		.string()
		.describe("The default background color, paired with `foreground`.")
		.default(defaultLightThemeStyles.background)
		.optional(),
	foreground: z
		.string()
		.describe("Paired with `background`.")
		.default(defaultLightThemeStyles.foreground)
		.optional(),
	card: z
		.string()
		.describe("The background color for cards, paired with `card-foreground`.")
		.default(defaultLightThemeStyles.card)
		.optional(),
	"card-foreground": z
		.string()
		.describe("Paired with `card`.")
		.default(defaultLightThemeStyles["card-foreground"])
		.optional(),
	popover: z
		.string()
		.describe(
			"The background color for popovers, paired with `popover-foreground`.",
		)
		.default(defaultLightThemeStyles.popover)
		.optional(),
	"popover-foreground": z
		.string()
		.describe("Paired with `popover`.")
		.default(defaultLightThemeStyles["popover-foreground"])
		.optional(),
	primary: z
		.string()
		.describe("The main color, paired with `primary-foreground`.")
		.default(defaultLightThemeStyles.primary)
		.optional(),
	"primary-foreground": z
		.string()
		.describe("Paired with `primary`.")
		.default(defaultLightThemeStyles["primary-foreground"])
		.optional(),
	secondary: z
		.string()
		.describe("A secondary color, paired with `secondary-foreground`.")
		.default(defaultLightThemeStyles.secondary)
		.optional(),
	"secondary-foreground": z
		.string()
		.describe("Paired with `secondary`.")
		.default(defaultLightThemeStyles["secondary-foreground"])
		.optional(),
	muted: z
		.string()
		.describe("A muted background color, paired with `muted-foreground`.")
		.default(defaultLightThemeStyles.muted)
		.optional(),
	"muted-foreground": z
		.string()
		.describe("Paired with `muted`.")
		.default(defaultLightThemeStyles["muted-foreground"])
		.optional(),
	accent: z
		.string()
		.describe(
			"Subtle color for hover or highlight, paired with `accent-foreground`.",
		)
		.default(defaultLightThemeStyles.accent)
		.optional(),
	"accent-foreground": z
		.string()
		.describe("Paired with `accent`.")
		.default(defaultLightThemeStyles["accent-foreground"])
		.optional(),
	destructive: z
		.string()
		.describe(
			"Color for destructive actions, paired with `destructive-foreground`.",
		)
		.default(defaultLightThemeStyles.destructive)
		.optional(),
	"destructive-foreground": z
		.string()
		.describe("Paired with `destructive`.")
		.default(defaultLightThemeStyles["destructive-foreground"])
		.optional(),
	border: z
		.string()
		.describe("The color for borders.")
		.default(defaultLightThemeStyles.border)
		.optional(),
	input: z
		.string()
		.describe("The background color for input fields.")
		.default(defaultLightThemeStyles.input)
		.optional(),
	ring: z
		.string()
		.describe("The color for focus rings.")
		.default(defaultLightThemeStyles.ring)
		.optional(),
	"chart-1": z.string().default(defaultLightThemeStyles["chart-1"]).optional(),
	"chart-2": z.string().default(defaultLightThemeStyles["chart-2"]).optional(),
	"chart-3": z.string().default(defaultLightThemeStyles["chart-3"]).optional(),
	"chart-4": z.string().default(defaultLightThemeStyles["chart-4"]).optional(),
	"chart-5": z.string().default(defaultLightThemeStyles["chart-5"]).optional(),
	sidebar: z
		.string()
		.describe(
			"The background color for the sidebar, paired with `sidebar-foreground`.",
		)
		.default(defaultLightThemeStyles.sidebar)
		.optional(),
	"sidebar-foreground": z
		.string()
		.describe("Paired with `sidebar`.")
		.default(defaultLightThemeStyles["sidebar-foreground"])
		.optional(),
	"sidebar-primary": z
		.string()
		.describe(
			"The primary color for sidebar elements, paired with `sidebar-primary-foreground`.",
		)
		.default(defaultLightThemeStyles["sidebar-primary"])
		.optional(),
	"sidebar-primary-foreground": z
		.string()
		.describe("Paired with `sidebar-primary`.")
		.default(defaultLightThemeStyles["sidebar-primary-foreground"])
		.optional(),
	"sidebar-accent": z
		.string()
		.describe(
			"An accent color for the sidebar, paired with `sidebar-accent-foreground`.",
		)
		.default(defaultLightThemeStyles["sidebar-accent"])
		.optional(),
	"sidebar-accent-foreground": z
		.string()
		.describe("Paired with `sidebar-accent`.")
		.default(defaultLightThemeStyles["sidebar-accent-foreground"])
		.optional(),
	"sidebar-border": z
		.string()
		.describe("The color for borders within the sidebar.")
		.default(defaultLightThemeStyles["sidebar-border"])
		.optional(),
	"sidebar-ring": z
		.string()
		.describe("The color for focus rings within the sidebar.")
		.default(defaultLightThemeStyles["sidebar-ring"])
		.optional(),
	"font-sans": z
		.string()
		.describe("The preferred sans-serif font family.")
		.default(defaultLightThemeStyles["font-sans"])
		.optional(),
	"font-serif": z
		.string()
		.describe("The preferred serif font family.")
		.default(defaultLightThemeStyles["font-serif"])
		.optional(),
	"font-mono": z
		.string()
		.describe("The preferred monospace font family.")
		.default(defaultLightThemeStyles["font-mono"])
		.optional(),
	radius: z
		.string()
		.describe(
			"The global border-radius for components. Use 0rem for sharp corners.",
		)
		.default(defaultLightThemeStyles.radius)
		.optional(),
	"shadow-color": z
		.string()
		.default(defaultLightThemeStyles["shadow-color"])
		.optional(),
	"shadow-opacity": z
		.string()
		.default(defaultLightThemeStyles["shadow-opacity"])
		.optional(),
	"shadow-blur": z
		.string()
		.default(defaultLightThemeStyles["shadow-blur"])
		.optional(),
	"shadow-spread": z
		.string()
		.default(defaultLightThemeStyles["shadow-spread"])
		.optional(),
	"shadow-offset-x": z
		.string()
		.default(defaultLightThemeStyles["shadow-offset-x"])
		.optional(),
	"shadow-offset-y": z
		.string()
		.default(defaultLightThemeStyles["shadow-offset-y"])
		.optional(),
	"letter-spacing": z
		.string()
		.describe("The global letter spacing for text.")
		.default(defaultLightThemeStyles["letter-spacing"])
		.optional(),
	spacing: z.string().default(defaultLightThemeStyles.spacing).optional(),
});

export const themeStylesSchema = z.object({
	light: themeStylePropsSchema,
	dark: themeStylePropsSchema,
});

export type ThemeStyleProps = z.infer<typeof themeStylePropsSchema>;
export type ThemeStyles = z.infer<typeof themeStylesSchema>;

export interface ThemeEditorPreviewProps {
	styles: ThemeStyles;
	currentMode: "light" | "dark";
}

export interface BaseEditorState {
	styles: ThemeStyles;
}

export interface ThemeEditorState extends BaseEditorState {
	preset?: string;
	styles: ThemeStyles;
	currentMode: "light" | "dark";
	hslAdjustments?: {
		hueShift: number;
		saturationScale: number;
		lightnessScale: number;
	};
}
