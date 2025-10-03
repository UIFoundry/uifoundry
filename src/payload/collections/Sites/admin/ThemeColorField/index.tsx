"use server";

import type { TextFieldServerProps } from "payload";
import type { TextField } from "~/payload/fields";
import { api } from "~/trpc/server";
import ThemeColorFieldClient from "./client";
import type { Site } from "~/payload-types";

export default async function ThemeColorField({
	field,
	path,
	clientField,
	data,
}: {
	field: { description?: string; mode: "light" | "dark" } & TextField;
	data: Site;
} & TextFieldServerProps) {
	if (data?.activeTheme) {
		if (typeof data.activeTheme === "string") {
			await api.themes.findById.prefetch({ id: data.activeTheme });
		} else {
			await api.themes.findById.prefetch({ id: data.activeTheme.id });
		}
	}

	return (
		<ThemeColorFieldClient
			field={{ mode: field.mode, ...clientField }}
			path={path}
		/>
	);
}
