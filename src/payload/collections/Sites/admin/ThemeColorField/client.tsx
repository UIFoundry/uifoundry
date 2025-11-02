"use client";

import type { TextFieldClientProps, TextFieldServerProps } from "payload";
import type z from "zod";

import { useField } from "@payloadcms/ui";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import Sketch from "@uiw/react-color-sketch";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { useDebounce } from "~/hooks/use-debounce";
import { cn } from "~/styles/utils";
import { useTRPC } from "~/trpc/client";
import { Button } from "~/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover";

import { colorFormatter } from "../color-converter";
import { type themeStylePropsSchema } from "../theme";

export default function ThemeColorField({
	field,
}: TextFieldClientProps & {
	field: TextFieldServerProps["clientField"] & {
		description?: string;
		mode: "dark" | "light";
	};
}) {
	const { queryClient, trpc } = useTRPC()
	const { value } = useField<string>({ path: "activeTheme" });
	const [open, setOpen] = useState(false);
	const activeTheme = useSuspenseQuery(trpc.themes.findById.queryOptions({ id: value }));
	const [updatedColor, setUpdatedColor] =
		useState<z.infer<typeof themeStylePropsSchema>>();
	const debouncedColor = useDebounce(updatedColor, 500);

	const updateThemeMutator = useMutation(trpc.themes.update.mutationOptions());
	const currentColor = activeTheme.data.success
		? ((activeTheme.data.data.styles as Record<string, Record<string, string>>)[
			field.mode
		]![field.name] ?? "#000000")
		: "#000000";
	const currentHexColor = colorFormatter(currentColor, "hex", "4");

	useEffect(() => {
		async function updateThemeStyles() {
			if (!updatedColor) { return; }
			await updateThemeMutator.mutateAsync({
				id: value,
				mode: field.mode,
				styles: updatedColor,
			});
			await queryClient.invalidateQueries(trpc.themes.pathFilter());
		}

		updateThemeStyles().catch((e) => console.error(e));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedColor]);

	return (
		<div>
			<div className="grid w-full grid-cols-3 gap-16">
				<label className="col-0">
					<span>{(field?.label as string)?.toUpperCase()}</span>
					{field.required ? <span className="pl-1 text-red-500">*</span> : ""}
					{field?.description ? (
						<p className="text-muted-foreground mt-1 text-xs">
							{field.description}
						</p>
					) : null}
				</label>
				<Popover onOpenChange={setOpen} open={open}>
					<PopoverTrigger asChild className="col-span-2 mt-2 cursor-pointer">
						<Button
							aria-expanded={open}
							className="relative justify-center"
							role="combobox"
							style={{ borderColor: currentColor }}
							variant="outline"
						>
							<span
								className="absolute left-4 h-4 w-4 rounded-full"
								style={{ background: currentColor }}
							/>
							<p className="font-mono">{currentHexColor}</p>
							<span
								className={cn(
									"absolute right-4",
									!updateThemeMutator.isPending && "hidden",
								)}
							>
								<LoaderCircle className="animate-spin duration-300" />
							</span>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="border-none">
						<Sketch
							color={currentHexColor}
							onChange={(color) => {
								setUpdatedColor({
									[field.name]: color.hex,
								});
							}}
						/>
					</PopoverContent>
				</Popover>
			</div>
			<hr />
		</div>
	);
}
