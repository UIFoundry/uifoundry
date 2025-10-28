"use client";

import { useState } from "react";

import { Button } from "~/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover";

import ImportTheme from "./ImportTheme";

export default function ImportThemeTrigger() {
	const [open, setOpen] = useState(false);
	return (
		<div className="relative mb-6 grid place-items-center">
			<Popover onOpenChange={setOpen} open={open}>
				<PopoverTrigger asChild className="cursor-pointer">
					<Button>Import Theme</Button>
				</PopoverTrigger>
				<PopoverContent className="w-100 bg-neutral-800/95">
					<ImportTheme path="activeTheme" />
				</PopoverContent>
			</Popover>
		</div>
	);
}
