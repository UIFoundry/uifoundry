"use server";

import type { TextFieldServerProps } from "payload";

import type { Site } from "~/payload-types";
import type { TextField } from "~/payload/fields";

import { api } from "~/trpc/server";

import ThemeColorFieldClient from "./client";

export default async function ThemeColorField({
	clientField,
	data,
	field,
	path,
}: TextFieldServerProps & {
	data: Site;
	field: TextField & { description?: string; mode: "dark" | "light" };
}) {
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
