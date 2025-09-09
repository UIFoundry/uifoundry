"use client";

import { Button } from "~/ui/button";
import ImportTheme from "./ImportTheme";
import { Popover, PopoverTrigger, PopoverContent } from "~/ui/popover";
import { useState } from "react";

export default function ImportThemeTrigger() {
	const [open, setOpen] = useState(false);
	return (
		<div className="relative grid place-items-center">
			<Popover open={open} onOpenChange={setOpen}>
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
