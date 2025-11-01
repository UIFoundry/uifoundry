import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const THEME_COLORS = {
	sidebar: "sidebar",
	sidebarAccent: "sidebar-accent",
	sidebarAccentForeground: "sidebar-accent-foreground",
	sidebarBorder: "sidebar-border",
	sidebarForeground: "sidebar-foreground",
	sidebarPrimary: "sidebar-primary",
	sidebarPrimaryForeground: "sidebar-primary-foreground",
	sidebarRing: "sidebar-ring",
	accent: "accent",
	accentForeground: "accent-foreground",
	background: "background",
	border: "border",
	card: "card",
	cardForeground: "card-foreground",
	chart1: "chart-1",
	chart2: "chart-2",
	chart3: "chart-3",
	chart4: "chart-4",
	chart5: "chart-5",
	destructive: "destructive",
	destructiveForeground: "destructive-foreground",
	foreground: "foreground",
	input: "input",
	muted: "muted",
	mutedForeground: "muted-foreground",
	popover: "popover",
	popoverForeground: "popover-foreground",
	primary: "primary",
	primaryForeground: "primary-foreground",
	ring: "ring",
	secondary: "secondary",
	secondaryForeground: "secondary-foreground",
} as const;
