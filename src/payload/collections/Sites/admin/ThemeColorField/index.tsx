"use server";

import type { TextFieldServerProps } from "payload";

import type { Site } from "~/payload-types";
import type { TextField } from "~/payload/fields";

import { createTRPCServer, HydrateClient } from "~/trpc/server";

import ThemeColorFieldClient from "./client";
import Loader from "./loading"

export default async function ThemeColorField({
	clientField,
	data,
	field,
	path,
}: TextFieldServerProps & {
	data: Site;
	field: TextField & { description?: string; mode: "dark" | "light" };
}) {
	const { queryClient, trpc } = await createTRPCServer()

	if (data?.activeTheme) {
		if (typeof data.activeTheme === "string") {
			await queryClient.prefetchQuery(trpc.themes.findById.queryOptions({ id: data.activeTheme }))
		} else {
			await queryClient.prefetchQuery(trpc.themes.findById.queryOptions({ id: data.activeTheme.id }))
		}
	}

	return (
		<HydrateClient fallback={<Loader field={{ mode: field.mode, ...clientField }} path={path} />}>
			<ThemeColorFieldClient
				field={{ mode: field.mode, ...clientField }}
				path={path}
			/>
		</HydrateClient>
	);
}
