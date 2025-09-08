import type { ThemeEditorState } from "@tweakcn/types/editor";
import { defaultThemeState } from "@tweakcn/config/theme";
import { getPresetThemeStyles } from "@tweakcn/utils/theme-preset-helper";
import { isDeepEqual } from "@tweakcn/lib/utils";
import { observable } from "@legendapp/state";

const MAX_HISTORY_COUNT = 30;
const HISTORY_OVERRIDE_THRESHOLD_MS = 500; // 0.5 seconds

interface ThemeHistoryEntry {
	state: ThemeEditorState;
	timestamp: number;
}

interface EditorState {
	themeState: ThemeEditorState;
	themeCheckpoint: ThemeEditorState | null;
	history: ThemeHistoryEntry[];
	future: ThemeHistoryEntry[];
}

const $state = observable<EditorState>({
	themeState: defaultThemeState,
	themeCheckpoint: null,
	history: [],
	future: [],
});

interface EditorStateActions {
	setThemeState: (state: ThemeEditorState) => void;
	applyThemePreset: (preset: string) => void;
	saveThemeCheckpoint: () => void;
	restoreThemeCheckpoint: () => void;
	resetToCurrentPreset: () => void;
	hasThemeChangedFromCheckpoint: () => boolean;
	hasUnsavedChanges: () => boolean;
	undo: () => void;
	redo: () => void;
	canUndo: () => boolean;
	canRedo: () => boolean;
}

const actions: EditorStateActions = {
	setThemeState: (newState: ThemeEditorState) => {
		const oldThemeState = $state.themeState.get();
		let currentHistory = $state.history.get();
		let currentFuture = $state.future.get();

		// Check if only currentMode changed
		const oldStateWithoutMode = { ...oldThemeState, currentMode: undefined };
		const newStateWithoutMode = { ...newState, currentMode: undefined };

		if (
			isDeepEqual(oldStateWithoutMode, newStateWithoutMode) &&
			oldThemeState.currentMode !== newState.currentMode
		) {
			// Only currentMode changed
			// Just update themeState without affecting history or future
			$state.themeState.set(newState);
			return;
		}

		const currentTime = Date.now();

		// If other things changed, or if it's an actual identical state set (though less likely here)
		// Proceed with history logic
		const lastHistoryEntry =
			currentHistory.length > 0
				? currentHistory[currentHistory.length - 1]
				: null;

		if (
			!lastHistoryEntry ||
			currentTime - lastHistoryEntry.timestamp >= HISTORY_OVERRIDE_THRESHOLD_MS
		) {
			// Add a new history entry
			currentHistory = [
				...currentHistory,
				{ state: oldThemeState, timestamp: currentTime },
			];
			currentFuture = [];
		}

		if (currentHistory.length > MAX_HISTORY_COUNT) {
			currentHistory.shift(); // Remove the oldest entry
		}

		$state.themeState.set(newState);
		$state.history.set(currentHistory);
		$state.future.set(currentFuture);
	},
	applyThemePreset: (preset: string) => {
		const currentThemeState = $state.themeState.get();
		const oldHistory = $state.history.get();
		const currentTime = Date.now();

		const newStyles = getPresetThemeStyles(preset);
		const newThemeState: ThemeEditorState = {
			...currentThemeState,
			preset,
			styles: newStyles,
			hslAdjustments: defaultThemeState.hslAdjustments,
		};

		const newHistoryEntry = {
			state: currentThemeState,
			timestamp: currentTime,
		};
		const updatedHistory = [...oldHistory, newHistoryEntry];
		if (updatedHistory.length > MAX_HISTORY_COUNT) {
			updatedHistory.shift();
		}

		$state.set({
			themeState: newThemeState,
			themeCheckpoint: newThemeState,
			history: updatedHistory,
			future: [],
		});
	},
	saveThemeCheckpoint: () => {
		$state.themeCheckpoint.set($state.themeState.get());
	},
	restoreThemeCheckpoint: () => {
		const checkpoint = $state.themeCheckpoint.get();
		if (checkpoint) {
			const oldThemeState = $state.themeState.get();
			const oldHistory = $state.history.get();
			const currentTime = Date.now();

			const newHistoryEntry = { state: oldThemeState, timestamp: currentTime };
			const updatedHistory = [...oldHistory, newHistoryEntry];
			if (updatedHistory.length > MAX_HISTORY_COUNT) {
				updatedHistory.shift();
			}

			$state.themeState.set({
				...checkpoint,
				currentMode: $state.themeState.currentMode.get(),
			});
			$state.history.set(updatedHistory);
			$state.future.set([]);
		} else {
			console.warn("No theme checkpoint available to restore to.");
		}
	},
	hasThemeChangedFromCheckpoint: () => {
		const checkpoint = $state.themeCheckpoint.get();
		return !isDeepEqual($state.themeState.get(), checkpoint);
	},
	hasUnsavedChanges: () => {
		const themeState = $state.themeState.get();
		const presetThemeStyles = getPresetThemeStyles(
			themeState.preset ?? "default",
		);
		const stylesChanged = !isDeepEqual(themeState.styles, presetThemeStyles);
		const hslChanged = !isDeepEqual(
			themeState.hslAdjustments,
			defaultThemeState.hslAdjustments,
		);
		return stylesChanged || hslChanged;
	},
	resetToCurrentPreset: () => {
		const currentThemeState = $state.themeState.get();

		const presetThemeStyles = getPresetThemeStyles(
			currentThemeState.preset ?? "default",
		);
		const newThemeState: ThemeEditorState = {
			...currentThemeState,
			styles: presetThemeStyles,
			hslAdjustments: defaultThemeState.hslAdjustments,
		};

		$state.set({
			themeState: newThemeState,
			themeCheckpoint: newThemeState,
			history: [],
			future: [],
		});
	},
	undo: () => {
		const lastHistoryEntry = $state.history.pop();
		if (!lastHistoryEntry) return;

		$state.themeState.set((prev) => ({
			...lastHistoryEntry.state,
			currentMode: prev.currentMode,
		}));

		const newFutureEntry = {
			state: $state.themeState.get(),
			timestamp: Date.now(),
		};
		$state.future.unshift(newFutureEntry);
	},
	redo: () => {
		const firstFutureEntry = $state.future.shift();
		if (!firstFutureEntry) return;

		$state.themeState.set((prev) => ({
			...firstFutureEntry.state,
			currentMode: prev.currentMode,
		}));
		$state.themeCheckpoint.set(firstFutureEntry.state);

		const history = $state.history.get();
		const newHistoryEntry = {
			state: $state.themeState.get(),
			timestamp: Date.now(),
		};
		const updatedHistory = [...history, newHistoryEntry];
		if (updatedHistory.length > MAX_HISTORY_COUNT) {
			updatedHistory.shift();
		}
		$state.history.set(updatedHistory);
	},
	canUndo: () => $state.history.get().length > 0,
	canRedo: () => $state.future.get().length > 0,
};

export const $editorStore = { $state, actions };
