import { Separator } from "~/ui/separator";
import { useAIThemeGenerationCore } from "@tweakcn/hooks/use-ai-theme-generation-core";
import { useAIChatStore } from "@tweakcn/store/ai-chat-store";
import { $editorStore } from "@tweakcn/store/editor-store";
import { $themePresetStore } from "@tweakcn/store/theme-preset-store";
import { CodeButton } from "./code-button";
import { EditButton } from "./edit-button";
import { ImportButton } from "./import-button";
import { MoreOptions } from "./more-options";
import { ResetButton } from "./reset-button";
import { SaveButton } from "./save-button";
import { ShareButton } from "./share-button";
import { ThemeToggle } from "./theme-toggle";
import { UndoRedoButtons } from "./undo-redo-buttons";
import { use$ } from "@legendapp/state/react";

interface ActionBarButtonsProps {
	onImportClick: () => void;
	onCodeClick: () => void;
	onSaveClick: () => void;
	onShareClick: (id?: string) => void;
	isSaving: boolean;
}

export function ActionBarButtons({
	onImportClick,
	onCodeClick,
	onSaveClick,
	onShareClick,
	isSaving,
}: ActionBarButtonsProps) {
	const {
		$state,
		actions: { resetToCurrentPreset, hasUnsavedChanges },
	} = $editorStore;
	const themeState = use$($state.themeState);
	const { loading: aiGenerationLoading } = useAIThemeGenerationCore();
	const {
		actions: { getPreset },
	} = $themePresetStore;
	const currentPreset = themeState?.preset
		? getPreset(themeState?.preset)
		: undefined;
	const isSavedPreset = !!currentPreset && currentPreset.source === "SAVED";
	const { clearMessages } = useAIChatStore();

	const handleReset = () => {
		resetToCurrentPreset();
		clearMessages();
	};

	return (
		<div className="flex items-center gap-1">
			<MoreOptions disabled={aiGenerationLoading} />
			<Separator orientation="vertical" className="mx-1 h-8" />
			<ThemeToggle />
			<Separator orientation="vertical" className="mx-1 h-8" />
			<UndoRedoButtons disabled={aiGenerationLoading} />
			<Separator orientation="vertical" className="mx-1 h-8" />
			<ResetButton
				onClick={handleReset}
				disabled={!hasUnsavedChanges() || aiGenerationLoading}
			/>
			<div className="hidden items-center gap-1 md:flex">
				<ImportButton onClick={onImportClick} disabled={aiGenerationLoading} />
			</div>
			<Separator orientation="vertical" className="mx-1 h-8" />
			{isSavedPreset && (
				<EditButton
					themeId={themeState.preset!}
					disabled={aiGenerationLoading}
				/>
			)}
			<ShareButton
				onClick={() => onShareClick(themeState.preset)}
				disabled={aiGenerationLoading}
			/>
			<SaveButton
				onClick={onSaveClick}
				isSaving={isSaving}
				disabled={aiGenerationLoading}
			/>
			<CodeButton onClick={onCodeClick} disabled={aiGenerationLoading} />
		</div>
	);
}
