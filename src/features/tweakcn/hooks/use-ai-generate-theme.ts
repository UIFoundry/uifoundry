"use client";

import { toast } from "@tweakcn/hooks/use-toast";
import { useAIChatStore } from "@tweakcn/store/ai-chat-store";
import { AIPromptData } from "@tweakcn/types/ai";
import { useAIThemeGenerationCore } from "./use-ai-theme-generation-core";

export function useAIGenerateTheme() {
  const { generateThemeCore } = useAIThemeGenerationCore();
  const { addUserMessage, addAssistantMessage } = useAIChatStore();

  const generateTheme = async (promptData: AIPromptData | null) => {
    if (!promptData) {
      toast({
        title: "Error",
        description: "Failed to generate theme. Please try again.",
      });
      return;
    }

    addUserMessage({
      promptData,
    });

    const updatedMessages = useAIChatStore.getState().messages;
    const response = await generateThemeCore(updatedMessages);

    if (response.success) {
      const { data: result } = response;

      addAssistantMessage({
        content: result.text ?? "Here's the theme I generated for you.",
        themeStyles: result.theme,
      });
    } else {
      addAssistantMessage({
        content: response.message ?? "Failed to generate theme.",
        isError: !!response.error,
      });
    }
  };

  return { generateTheme };
}
