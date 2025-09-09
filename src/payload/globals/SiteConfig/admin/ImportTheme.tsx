"use client";

import { useField } from "@payloadcms/ui";
import { Textarea } from "~/ui/textarea";
import { Input } from "~/ui/input";
import { Label } from "~/ui/label";
import { Button } from "~/ui/button";
import { useForm } from "@tanstack/react-form";
import { parseCssInput } from "./parse-css-input";
import { api } from "~/trpc/react";

export default function ImportThemePopover({ path }: { path: string }) {
	const { setValue } = useField<string>({ path });
	const createThemeMutator = api.themes.create.useMutation();

	const form = useForm({
		defaultValues: {
			themeName: "",
			themeCss: "",
			setThemeOnImport: true,
		},
		onSubmit: async ({ value: data }) => {
			if (data.themeCss.length === 0) {
				console.log("no theme given");
				return;
			}
			const theme = parseCssInput(data.themeCss);
			if (!theme || (!theme.lightColors && !theme.darkColors)) return;
			const res = await createThemeMutator.mutateAsync({
				name: data.themeName,
				light: theme.lightColors,
				dark: theme.darkColors,
			});
			if (!res) return;
			if (data.setThemeOnImport) {
				setValue(res.id);
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
				name="themeName"
				validators={{
					onChange: ({ value }) => {
						if (!value) return "A theme name is required";
						if (value.length < 3)
							return "Theme name must be at least three characters";
						return undefined;
					},
				}}
				// eslint-disable-next-line react/no-children-prop
				children={(field) => {
					return (
						<div className="pb-6">
							<Label htmlFor={field.name} className="pb-2">
								Theme Name
							</Label>
							<Input
								id={field.name}
								name={field.name}
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								onBlur={field.handleBlur}
							/>
						</div>
					);
				}}
			/>
			<form.Field
				name="themeCss"
				validators={{
					onChange: ({ value }) => {
						if (!value) return "Theme css contents are required";
						if (value.length < 3) return "Theme css contents are required";
						return undefined;
					},
				}}
				// eslint-disable-next-line react/no-children-prop
				children={(field) => {
					return (
						<>
							<Label htmlFor={field.name}>globals.css file contents</Label>
							<Textarea
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								className="mx-auto my-2 max-h-64 min-h-42 max-w-90 min-w-90 overflow-x-clip overflow-y-scroll"
							/>
						</>
					);
				}}
			/>
			<form.Field
				name="setThemeOnImport"
				// eslint-disable-next-line react/no-children-prop
				children={(field) => {
					return (
						<div className="flex justify-center gap-2">
							<Label htmlFor="setThemeOnImport">Set to Active Theme</Label>
							<Input
								id={field.name}
								name={field.name}
								type="checkbox"
								checked={field.state.value}
								onChange={() => field.handleChange(!field.state.value)}
								size={4}
								className="size-8"
							/>
						</div>
					);
				}}
			/>
			<form.Subscribe
				selector={(state) => [state.canSubmit, state.isSubmitting]}
				// eslint-disable-next-line react/no-children-prop
				children={([canSubmit, isSubmitting]) => (
					<Button type="submit" disabled={!canSubmit}>
						{isSubmitting ? "..." : "Import"}
					</Button>
				)}
			/>
		</form>
	);
}
