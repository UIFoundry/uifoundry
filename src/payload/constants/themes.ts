export const THEME_TYPES = {
	user: "user",
	template: "template",
} as const;
export type ThemeType = (typeof THEME_TYPES)[keyof typeof THEME_TYPES];

const themeJsonSchema = {
	background: {
		type: "string",
		required: true,
	},
	foreground: {
		type: "string",
		required: true,
	},
	card: {
		type: "string",
		required: true,
	},
	"card-foreground": {
		type: "string",
		required: true,
	},
	popover: {
		type: "string",
		required: true,
	},
	"popover-foreground": {
		type: "string",
		required: true,
	},
	primary: {
		type: "string",
		required: true,
	},
	"primary-foreground": {
		type: "string",
		required: true,
	},
	secondary: {
		type: "string",
		required: true,
	},
	"secondary-foreground": {
		type: "string",
		required: true,
	},
	muted: {
		type: "string",
		required: true,
	},
	"muted-foreground": {
		type: "string",
		required: true,
	},
	accent: {
		type: "string",
		required: true,
	},
	"accent-foreground": {
		type: "string",
		required: true,
	},
	destructive: {
		type: "string",
		required: true,
	},
	"destructive-foreground": {
		type: "string",
		required: true,
	},
	border: {
		type: "string",
		required: true,
	},
	input: {
		type: "string",
		required: true,
	},
	ring: {
		type: "string",
		required: true,
	},
	"chart-1": {
		type: "string",
		required: true,
	},
	"chart-2": {
		type: "string",
		required: true,
	},
	"chart-3": {
		type: "string",
		required: true,
	},
	"chart-4": {
		type: "string",
		required: true,
	},
	"chart-5": {
		type: "string",
		required: true,
	},
	sidebar: {
		type: "string",
		required: true,
	},
	"sidebar-foreground": {
		type: "string",
		required: true,
	},
	"sidebar-primary": {
		type: "string",
		required: true,
	},
	"sidebar-primary-foreground": {
		type: "string",
		required: true,
	},
	"sidebar-accent": {
		type: "string",
		required: true,
	},
	"sidebar-accent-foreground": {
		type: "string",
		required: true,
	},
	"sidebar-border": {
		type: "string",
		required: true,
	},
	"sidebar-ring": {
		type: "string",
		required: true,
	},
	"font-sans": {
		type: "string",
		required: true,
	},
	"font-serif": {
		type: "string",
		required: true,
	},
	"font-mono": {
		type: "string",
		required: true,
	},
	radius: {
		type: "string",
		required: true,
	},
	"shadow-color": {
		type: "string",
		required: true,
	},
	"shadow-opacity": {
		type: "string",
		required: true,
	},
	"shadow-blur": {
		type: "string",
		required: true,
	},
	"shadow-spread": {
		type: "string",
		required: true,
	},
	"shadow-offset-x": {
		type: "string",
		required: true,
	},
	"shadow-offset-y": {
		type: "string",
		required: true,
	},
	"letter-spacing": {
		type: "string",
		required: true,
	},
	spacing: {
		type: "string",
		required: true,
	},
} as const;

export const jsonSchema = {
	light: {
		type: "object",
		required: true,
		properties: themeJsonSchema,
	},
	dark: {
		type: "object",
		required: true,
		properties: themeJsonSchema,
	},
} as const;
