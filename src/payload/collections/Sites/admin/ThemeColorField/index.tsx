"use server";

import type { TextFieldServerProps } from "payload";

import type { Site, Theme } from "~/payload-types";
import type { TextField } from "~/payload/fields";

import { createTRPCServer, HydrateClient } from "~/trpc/server";

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
	const { queryClient, trpc } = await createTRPCServer()

	if (data?.activeTheme) {
		if (typeof data.activeTheme === "string") {
			await queryClient.prefetchQuery({
				queryFn: () => trpc.themes.findById({ id: data.activeTheme as string }),
				queryKey: [["themes", "findById"], { input: { id: data.activeTheme } }, "query"]
			})
		} else {
			await queryClient.prefetchQuery({
				queryFn: () => trpc.themes.findById({ id: (data.activeTheme as Theme).id }),
				queryKey: [["themes", "findById"], { input: { id: data.activeTheme } }, "query"]
			})
		}
	}

	return (
		<HydrateClient>
			<ThemeColorFieldClient
				field={{ mode: field.mode, ...clientField }}
				path={path}
			/>
		</HydrateClient>
	);
}
