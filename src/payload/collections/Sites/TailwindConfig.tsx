import type { Theme, Site } from "~/payload-types";
import type { ThemeStyles } from "./admin/theme";

export default async function TailwindConfig({ site }: { site: Site }) {
	const theme = site.activeTheme as Theme;

	// eslint-disable-next-line @typescript-eslint/prefer-optional-chain
	if (!theme || !theme.styles) return null;

	const lightCssVars: string[] = [];
	const darkCssVars: string[] = [];

	for (const [key, value] of Object.entries(
		(theme.styles as ThemeStyles).light,
	)) {
		if (typeof value === "string" && value.length > 0) {
			lightCssVars.push(`--${key}: ${value};`);
		}
	}
	for (const [key, value] of Object.entries(
		(theme.styles as ThemeStyles).dark,
	)) {
		if (typeof value === "string" && value.length > 0) {
			darkCssVars.push(`--${key}: ${value};`);
		}
	}

	if (lightCssVars.length === 0 && darkCssVars.length === 0) return null;

	const css = `:root{${lightCssVars.join("")}}\n.dark{${darkCssVars.join("")}}`;

	return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
