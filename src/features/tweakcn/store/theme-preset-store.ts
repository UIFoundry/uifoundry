import type { ThemePreset } from "@tweakcn/types/themes";
import { defaultPresets } from "@tweakcn/utils/theme-presets";
import { getThemes } from "@tweakcn/actions/themes";
import { observable } from "@legendapp/state";

interface ThemePresetState {
	presets: Record<string, ThemePreset>;
}

export const $state = observable<ThemePresetState>({
	presets: defaultPresets,
});

interface ThemePresetStateActions {
	registerPreset: (name: string, preset: ThemePreset) => void;
	unregisterPreset: (name: string) => void;
	updatePreset: (name: string, preset: ThemePreset) => void;
	getPreset: (name: string) => ThemePreset | undefined;
	getAllPresets: () => Record<string, ThemePreset>;
	loadSavedPresets: () => Promise<void>;
	unloadSavedPresets: () => void;
}

const actions: ThemePresetStateActions = {
	registerPreset: (name: string, preset: ThemePreset) => {
		$state.set((state) => ({
			presets: {
				...state.presets,
				[name]: preset,
			},
		}));
	},
	unregisterPreset: (name: string) => {
		$state.set((state) => {
			const { [name]: _, ...remainingPresets } = state.presets;
			return {
				presets: remainingPresets,
			};
		});
	},
	loadSavedPresets: async () => {
		try {
			const savedThemes = await getThemes();
			const savedPresets = savedThemes.docs.reduce(
				(acc, theme) => {
					acc[theme.id] = {
						label: theme.name,
						// @ts-expect-error mismatch payload cms json field type from ~/payload/collections/Themes.ts
						styles: theme.styles,
						source: "SAVED",
					};
					return acc;
				},
				{} as Record<string, ThemePreset>,
			);

			$state.set((state) => ({
				presets: {
					...state.presets,
					...savedPresets,
				},
			}));
		} catch (error) {
			console.error("Failed to load saved presets:", error);
		}
	},
	unloadSavedPresets: () => {
		$state.set({ presets: defaultPresets });
	},
	updatePreset: (name: string, preset: ThemePreset) => {
		$state.set((state) => ({
			presets: {
				...state.presets,
				[name]: preset,
			},
		}));
	},
	getPreset: (name: string) => {
		return $state.presets.get()[name];
	},
	getAllPresets: () => {
		return $state.presets.get();
	},
};

export const $themePresetStore = { $state: $state, actions: actions };
