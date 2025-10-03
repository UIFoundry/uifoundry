"use client";

import type { TextFieldClientProps, TextFieldServerProps } from "payload";
import { useField } from "@payloadcms/ui";
import Sketch from "@uiw/react-color-sketch";
import { Popover, PopoverTrigger, PopoverContent } from "~/ui/popover";
import { Button } from "~/ui/button";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { cn } from "~/styles/utils";
import { LoaderCircle } from "lucide-react";
import { useDebounce } from "~/hooks/use-debounce";
import { type themeStylePropsSchema } from "../theme";
import type z from "zod";
import { colorFormatter } from "../color-converter";

export default function ThemeColorField({
	field,
}: {
	field: {
		description?: string;
		mode: "light" | "dark";
	} & TextFieldServerProps["clientField"];
} & TextFieldClientProps) {
	const { value } = useField<string>({ path: "activeTheme" });
	const [open, setOpen] = useState(false);
	const [activeTheme] = api.themes.findById.useSuspenseQuery({ id: value });
	const [updatedColor, setUpdatedColor] =
		useState<z.infer<typeof themeStylePropsSchema>>();
	const debouncedColor = useDebounce(updatedColor, 500);

	const apiUtils = api.useUtils();
	const updateThemeMutator = api.themes.update.useMutation();
	const currentColor = activeTheme?.success
		? ((activeTheme.data.styles as Record<string, Record<string, string>>)[
			field.mode
		]![field.name] ?? "#000000")
		: "#000000";
	const currentHexColor = colorFormatter(currentColor, "hex", "4");

	useEffect(() => {
		async function updateThemeStyles() {
			if (!updatedColor) return;
			await updateThemeMutator.mutateAsync({
				id: value,
				mode: field.mode,
				styles: updatedColor,
			});
			await apiUtils.themes.invalidate();
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
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild className="col-span-2 mt-2 cursor-pointer">
						<Button
							variant="outline"
							role="combobox"
							aria-expanded={open}
							className="relative justify-center"
							style={{ borderColor: currentColor }}
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
