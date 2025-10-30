"use client";

import { useField } from "@payloadcms/ui";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

import { useTRPC } from "~/trpc/react";
import { Button } from "~/ui/button";
import { Input } from "~/ui/input";
import { Label } from "~/ui/label";
import { Textarea } from "~/ui/textarea";

import { parseCssInput } from "./parse-css-input";

export default function ImportThemePopover({ path }: { path: string }) {
	const trpc = useTRPC()
	const { setValue } = useField<string>({ path });
	const createThemeMutator = useMutation(trpc.themes.create.mutationOptions());

	const form = useForm({
		defaultValues: {
			setThemeOnImport: true,
			themeCss: "",
			themeName: "",
		},
		onSubmit: async ({ formApi, value: data }) => {
			if (data.themeCss.length === 0) {
				console.log("no theme given");
				return;
			}
			const theme = parseCssInput(data.themeCss);
			if (!theme || (!theme.lightColors && !theme.darkColors)) {
				return;
			}
			const res = await createThemeMutator.mutateAsync({
				name: data.themeName,
				dark: theme.darkColors,
				light: theme.lightColors,
			});
			if (!res.success) {
				return;
			}
			if (data.setThemeOnImport) {
				setValue(res.data.id);
				formApi.reset();
			}
		},
	});

	return (
		<form
			className="text-center"
			onSubmit={async (e) => {
				e.preventDefault();
				e.stopPropagation();
				await form.handleSubmit();
			}}
		>
			<form.Field
				// eslint-disable-next-line react/no-children-prop
				children={(field) => {
					return (
						<div className="pb-6">
							<Label className="pb-2" htmlFor={field.name}>
								Theme Name
							</Label>
							<Input
								id={field.name}
								name={field.name}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								value={field.state.value}
							/>
						</div>
					);
				}}
				name="themeName"
				validators={{
					onChange: ({ value }) => {
						if (!value) {
							return "A theme name is required";
						}
						if (value.length < 3) {
							return "Theme name must be at least three characters";
						}
						return undefined;
					},
				}}
			/>
			<form.Field
				// eslint-disable-next-line react/no-children-prop
				children={(field) => {
					return (
						<>
							<Label htmlFor={field.name}>globals.css file contents</Label>
							<Textarea
								className="mx-auto my-2 max-h-64 min-h-42 max-w-90 min-w-90 overflow-x-clip overflow-y-scroll"
								id={field.name}
								name={field.name}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								value={field.state.value}
							/>
						</>
					);
				}}
				name="themeCss"
				validators={{
					onChange: ({ value }) => {
						if (!value) {
							return "Theme css contents are required";
						}
						if (value.length < 3) {
							return "Theme css contents are required";
						}
						return undefined;
					},
				}}
			/>
			<form.Field
				// eslint-disable-next-line react/no-children-prop
				children={(field) => {
					return (
						<div className="flex justify-center gap-2">
							<Label htmlFor="setThemeOnImport">Set to Active Theme</Label>
							<Input
								checked={field.state.value}
								className="size-8"
								id={field.name}
								name={field.name}
								onChange={() => field.handleChange(!field.state.value)}
								size={4}
								type="checkbox"
							/>
						</div>
					);
				}}
				name="setThemeOnImport"
			/>
			<form.Subscribe
				selector={(state) => [state.canSubmit, state.isSubmitting]}
			>
				{([canSubmit, isSubmitting]) => (
					<Button disabled={!canSubmit} type="submit">
						{isSubmitting ? "..." : "Import"}
					</Button>
				)}
			</form.Subscribe>
		</form>
	);
}
