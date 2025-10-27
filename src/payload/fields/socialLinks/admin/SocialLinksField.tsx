"use client";

import type { OptionObject, SelectFieldClientProps } from "payload";

import { useField } from "@payloadcms/ui";
import { Check, ChevronsUpDown } from "lucide-react";
import { type Dispatch, type SetStateAction, useState } from "react";

import { cn } from "~/styles/utils";
import { Button } from "~/ui/button";
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
	type SocialIconKey,
	socialIcons,
} from "~/ui/icons/social-icons";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/ui/popover";

export default function SocialIconField({
	field,
	path,
}: SelectFieldClientProps) {
	const { setValue, value } = useField<SocialIconKey>({ path });
	const [open, setOpen] = useState(false);
	const selectIcon = socialIcons[value];

	return (
		<div className="">
			<label>
				{field.label as string}
				{field.required ? <span className="pl-1 text-red-500">*</span> : ""}
			</label>
			<Popover onOpenChange={setOpen} open={open}>
				<PopoverTrigger asChild className="mt-2 w-full cursor-pointer">
					<Button
						aria-expanded={open}
						className="justify-between"
						role="combobox"
						variant="outline"
					>
						{selectIcon && <SocialIcon icon={value} />}
						{value ? value : "Find Social Link..."}
						<ChevronsUpDown className="opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[var(--radix-popover-trigger-width)] bg-neutral-200 dark:bg-neutral-600">
					<Command value={value}>
						<CommandInput
							className="border-none"
							placeholder="Search Icons..."
						/>
						<CommandList>
							<CommandEmpty>No Icons Found.</CommandEmpty>
							<CommandGroup>
								{field.options.map((socialIcon, index) => (
									<SocialIconKey
										icon={socialIcon as OptionObject}
										index={index}
										key={`${index}-${(socialIcon as OptionObject).value}`}
										setOpen={setOpen}
										setValue={setValue}
										value={value}
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

function SocialIconKey({
	icon,
	index,
	setOpen,
	setValue,
	value,
}: {
	icon: OptionObject;
	index: number;
	setOpen: Dispatch<SetStateAction<boolean>>;
	setValue: (val: unknown, disableModifyingForm?: boolean) => void;
	value: SocialIconKey;
}) {
	return (
		<CommandItem
			className="cursor-pointer transition-colors duration-400 hover:bg-neutral-300"
			key={`${index}-${icon.value}`}
			onSelect={(currentValue) => {
				setValue(currentValue === value ? "" : currentValue);
				setOpen(false);
			}}
			value={icon.value}
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
