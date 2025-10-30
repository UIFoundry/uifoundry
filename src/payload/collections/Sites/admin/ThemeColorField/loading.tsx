"use client";

import type { TextFieldClientProps, TextFieldServerProps } from "payload";

import { Loader2 } from "lucide-react";

export default function ThemeColorField({
	field,
}: TextFieldClientProps & {
	field: TextFieldServerProps["clientField"] & {
		description?: string;
		mode: "dark" | "light";
	};
}) {

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
				<div className="col-span-2 grid place-items-center">
					<Loader2 className="animate-spin size-6" />
				</div>
			</div>
			<hr />
		</div>
	);
}
