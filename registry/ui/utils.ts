import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const THEME_COLORS = {
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
	sidebarForeground: "sidebar-foreground",
	sidebarPrimary: "sidebar-primary",
	sidebarPrimaryForeground: "sidebar-primary-foreground",
	sidebarAccent: "sidebar-accent",
	sidebarAccentForeground: "sidebar-accent-foreground",
	sidebarBorder: "sidebar-border",
	sidebarRing: "sidebar-ring",
} as const;
