"use server";

import { z } from "zod";
import { getPayload } from "~/payload/utils";
import { auth } from "~/auth";
import { headers } from "next/headers";
import { themeStylesSchema, type ThemeStyles } from "@tweakcn/types/themes";
import { cache } from "react";
import {
	UnauthorizedError,
	ValidationError,
	ThemeNotFoundError,
} from "@tweakcn/types/errors";
// import { MAX_FREE_THEMES } from "@tweakcn/lib/constants";
// import { getMyActiveSubscription } from "@tweakcn/lib/subscription";
import { COLLECTION_SLUG_THEMES } from "~/payload/constants/collections";

// Helper to get user ID with better error handling
async function getCurrentUserId(): Promise<string> {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		throw new UnauthorizedError();
	}

	return session.user.id;
}

// Log errors for observability
function logError(error: Error, context: Record<string, unknown>) {
	console.error("Theme action error:", error, context);

	// TODO: Add server-side error reporting to PostHog or your preferred service
	// For production, you'd want to send critical errors to an external service
	if (error.name === "UnauthorizedError" || error.name === "ValidationError") {
		// These are expected errors, log but don't report
		console.warn("Expected error:", { error: error.message, context });
	} else {
		// Unexpected errors should be reported
		console.error("Unexpected error:", {
			error: error.message,
			stack: error.stack,
			context,
		});
	}
}

const createThemeSchema = z.object({
	name: z
		.string()
		.min(1, "Theme name cannot be empty")
		.max(50, "Theme name too long"),
	styles: themeStylesSchema,
});

const updateThemeSchema = z.object({
	id: z.string().min(1, "Theme ID required"),
	name: z
		.string()
		.min(1, "Theme name cannot be empty")
		.max(50, "Theme name too long")
		.optional(),
	styles: themeStylesSchema.optional(),
});

// Layer 1: Clean server actions with proper error handling
export async function getThemes() {
	try {
		const userId = await getCurrentUserId();
		const payload = await getPayload();
		const userThemes = await payload.find({
			collection: COLLECTION_SLUG_THEMES,
			where: {
				author: {
					equals: userId,
				},
			},
		});
		return userThemes;
	} catch (error) {
		logError(error as Error, { action: "getThemes" });
		throw error;
	}
}

export const getTheme = cache(async (themeId: string) => {
	try {
		if (!themeId) {
			throw new ValidationError("Theme ID required");
		}

		const payload = await getPayload();
		const theme = await payload.findByID({
			collection: COLLECTION_SLUG_THEMES,
			id: themeId,
		});

		if (!theme) {
			throw new ThemeNotFoundError();
		}

		return theme;
	} catch (error) {
		logError(error as Error, { action: "getTheme", themeId });
		throw error;
	}
});

export async function createTheme(formData: {
	name: string;
	styles: ThemeStyles;
}) {
	try {
		const userId = await getCurrentUserId();

		const validation = createThemeSchema.safeParse(formData);
		if (!validation.success) {
			throw new ValidationError("Invalid input", validation.error.format());
		}

		const payload = await getPayload();
		// TODO: add theme limits based on current user tier
		// const userThemes = await payload.find({
		// 	collection: COLLECTION_SLUG_THEMES,
		// 	where: {
		// 		author: {
		// 			equals: userId,
		// 		}
		// 	}
		// })

		// if (userThemes.length >= MAX_FREE_THEMES) {
		// 	const activeSubscription = await getMyActiveSubscription(userId);
		// 	const isSubscribed =
		// 		!!activeSubscription &&
		// 		activeSubscription?.productId ===
		// 		process.env.NEXT_PUBLIC_TWEAKCN_PRO_PRODUCT_ID;
		//
		// 	if (!isSubscribed) {
		// 		throw new ThemeLimitError(
		// 			`You cannot have more than ${MAX_FREE_THEMES} themes.`,
		// 		);
		// 	}
		// }

		const { name, styles } = validation.data;

		const insertedTheme = await payload.create({
			collection: COLLECTION_SLUG_THEMES,
			data: {
				author: userId,
				name,
				styles,
			},
		});

		return insertedTheme;
	} catch (error) {
		logError(error as Error, {
			action: "createTheme",
			formData: { name: formData.name },
		});
		throw error;
	}
}

export async function updateTheme(formData: {
	id: string;
	name?: string;
	styles?: ThemeStyles;
}) {
	try {
		const validation = updateThemeSchema.safeParse(formData);
		if (!validation.success) {
			throw new ValidationError("Invalid input", validation.error.format());
		}

		const { id: themeId, name, styles } = validation.data;

		if (!name && !styles) {
			throw new ValidationError("No update data provided");
		}

		const payload = await getPayload();
		const updatedTheme = await payload.update({
			collection: COLLECTION_SLUG_THEMES,
			id: themeId,
			data: {
				name,
				styles,
			},
		});

		if (!updatedTheme) {
			throw new ThemeNotFoundError("Theme not found or not owned by user");
		}

		return updatedTheme;
	} catch (error) {
		logError(error as Error, { action: "updateTheme", themeId: formData.id });
		throw error;
	}
}

export async function deleteTheme(themeId: string) {
	try {
		if (!themeId) {
			throw new ValidationError("Theme ID required");
		}

		const payload = await getPayload();
		const deletedTheme = await payload.delete({
			collection: COLLECTION_SLUG_THEMES,
			id: themeId,
		});

		if (!deletedTheme) {
			throw new ThemeNotFoundError("Theme not found or not owned by user");
		}

		return deletedTheme;
	} catch (error) {
		logError(error as Error, { action: "deleteTheme", themeId });
		throw error;
	}
}
