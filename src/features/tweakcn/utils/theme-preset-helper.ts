import { defaultThemeState } from "../config/theme";
import type { ThemeStyles } from "@tweakcn/types/themes";
import { $themePresetStore } from "@tweakcn/store/theme-preset-store";

export function getPresetThemeStyles(name: string): ThemeStyles {
	const defaultTheme = defaultThemeState.styles;
	if (name === "default") {
		return defaultTheme;
	}

	const { actions } = $themePresetStore;
	const preset = actions.getPreset(name);
	if (!preset) {
		return defaultTheme;
	}

	return {
		light: {
			...defaultTheme.light,
			...(preset.styles.light || {}),
		},
		dark: {
			...defaultTheme.dark,
			...(preset.styles.light || {}),
			...(preset.styles.dark || {}),
		},
	};
}
