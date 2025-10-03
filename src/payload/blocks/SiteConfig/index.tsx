import { getPayload } from "~/payload/utils";
import { GLOBAL_SLUG_SITE_CONFIG } from "~/payload/constants/globals";
import type { Theme } from "~/payload-types";
import type { ThemeStyles } from "../SiteConfig/admin/theme";

export default async function TailwindConfig({
	draft,
}: {
	draft?: "true" | "false";
}) {
	const payload = await getPayload();
	const config = await payload.findGlobal({
		slug: GLOBAL_SLUG_SITE_CONFIG,
		draft: draft === "true",
		overrideAccess: true,
		depth: 1,
	});
	const theme = config.activeTheme as Theme;

	// eslint-disable-next-line @typescript-eslint/prefer-optional-chain
	if (!config || !theme || !theme.styles) return null;

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
