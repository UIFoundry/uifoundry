import { getPayload } from "~/payload/utils";
import { GLOBAL_SLUG_TAILWIND } from "~/payload/constants/globals";

export const TAILWIND_COLORS = {
	background: "background",
	foreground: "foreground",
	card: "card",
	cardForeground: "card-foreground",
	popover: "popover",
	popoverForeground: "popover-foreground",
	primary: "primary",
	primaryForeground: "primary-foreground",
	secondary: "secondary",
	secondaryForeground: "secondary-foreground",
	muted: "muted",
	mutedForeground: "muted-foreground",
	accent: "accent",
	accentForeground: "accent-foreground",
	destructive: "destructive",
	destructiveForeground: "destructive-foreground",
	border: "border",
	input: "input",
	ring: "ring",
	chart1: "chart-1",
	chart2: "chart-2",
	chart3: "chart-3",
	chart4: "chart-4",
	chart5: "chart-5",
	sidebar: "sidebar",
	sidebarForegroudn: "sidebar-foreground",
	sidebarPrimary: "sidebar-primary",
	sidebarPrimaryForeground: "sidebar-primary-foreground",
	sidebarAccent: "sidebar-accent",
	sidebarAccentForeground: "sidebar-accent-foreground",
	sidebarBorder: "sidebar-border",
	sidebarRing: "sidebar-ring",
} as const;
export type TailwindColor = typeof TAILWIND_COLORS[keyof typeof TAILWIND_COLORS]

export default async function TailwindConfig({ draft }: { draft?: "true" | "false" }) {
	const payload = await getPayload();
	const doc = await payload.findGlobal({
		slug: GLOBAL_SLUG_TAILWIND,
		draft: draft === "true",
		overrideAccess: true,
	});

	if (!doc) return null;

	const lines: string[] = [];

	if (typeof doc.radius === "number" && !Number.isNaN(doc.radius)) {
		lines.push(`--radius: ${doc.radius}rem;`);
	}

	for (const key of Object.values(TAILWIND_COLORS)) {
		const value = doc[key];
		if (typeof value === "string" && value.length > 0) {
			lines.push(`--${key}: ${value};`);
		}
	}

	if (lines.length === 0) return null;

	const css = `:root{${lines.join("")}}`;

	return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
