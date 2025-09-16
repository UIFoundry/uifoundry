"use client";

import {
	socialIcons,
	type SocialIconKey,
} from "~/ui/icons/social-icons";
import { Check, ChevronsUpDown } from "lucide-react";
import type { OptionObject, SelectFieldClientProps } from "payload";
import { useField } from "@payloadcms/ui";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "~/ui/command";
import SocialIcon from "~/ui/icons/social-icon";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/ui/popover";
import { cn } from "~/styles/utils";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "~/ui/button";

function SocialIconKey({
	icon,
	index,
	value,
	setValue,
	setOpen,
}: {
	icon: OptionObject;
	index: number;
	value: SocialIconKey;
	setValue: (val: unknown, disableModifyingForm?: boolean) => void;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) {
	return (
		<CommandItem
			value={icon.value}
			onSelect={(currentValue) => {
				setValue(currentValue === value ? "" : currentValue);
				setOpen(false);
			}}
			key={`${index}-${icon.value}`}
			className="cursor-pointer transition-colors duration-400 hover:bg-neutral-300"
		>
			<SocialIcon icon={icon.value as SocialIconKey} />
			{icon.value}
			<Check
				className={cn(
					"ml-auto opacity-0",
					value === icon.label && "opacity-100",
				)}
			/>
		</CommandItem>
	);
}

export default function SocialIconField({
	field,
	path,
}: SelectFieldClientProps) {
	const { value, setValue } = useField<SocialIconKey>({ path });
	const [open, setOpen] = useState(false);
	const selectIcon = socialIcons[value];

	return (
		<div className="">
			<label>
				{field.label as string}
				{field.required ? <span className="pl-1 text-red-500">*</span> : ""}
			</label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild className="mt-2 w-full cursor-pointer">
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="justify-between"
					>
						{selectIcon && <SocialIcon icon={value} />}
						{value ? value : "Find Social Link..."}
						<ChevronsUpDown className="opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[var(--radix-popover-trigger-width)] bg-neutral-200 dark:bg-neutral-600">
					<Command value={value}>
						<CommandInput
							placeholder="Search Icons..."
							className="border-none"
						/>
						<CommandList>
							<CommandEmpty>No Icons Found.</CommandEmpty>
							<CommandGroup>
								{field.options.map((socialIcon, index) => (
									<SocialIconKey
										key={`${index}-${(socialIcon as OptionObject).value}`}
										icon={socialIcon as OptionObject}
										index={index}
										value={value}
										setValue={setValue}
										setOpen={setOpen}
									/>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
