"use client"

import { Check, ChevronsUpDown, icons } from "lucide-react"
import type { Option, SelectFieldClientProps } from "payload"
import { useField } from "@payloadcms/ui"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from "~/ui/command"

import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "~/ui/popover"
import { cn } from "~/styles/utils"
import { useState, type Dispatch, type SetStateAction } from "react"
import { Button } from "~/ui/button"

type IconName = keyof typeof icons

function Icon({ icon, index, value, setValue, setOpen }: { icon: Option, index: number, value: IconName, setValue: (val: unknown, disableModifyingForm?: boolean) => void, setOpen: Dispatch<SetStateAction<boolean>> }) {
	const SelectIcon = icons[icon.label as IconName]
	return (
		<CommandItem
			value={icon.label}
			onSelect={(currentValue) => {
				setValue(currentValue === value ? "" : currentValue)
				setOpen(false)
			}}
			key={`${index}-${icon.label}`}
			className="hover:bg-neutral-300 transition-colors duration-400 cursor-pointer"
		>
			<SelectIcon />
			{icon.label}
			<Check className={cn("ml-auto opacity-0", value === icon.label && "opacity-100")} />
		</CommandItem>
	)
}

export default function IconField({ field, path }: SelectFieldClientProps) {

	const { value, setValue } = useField<IconName>({ path })
	const [open, setOpen] = useState(false)
	const SelectIcon = icons[value]

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild className="w-full cursor-pointer mt-8">
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="justify-between"
				>
					{SelectIcon && <SelectIcon />}
					{value
						? value
						: "Select Icon..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="bg-neutral-600 w-full">
				<Command value={value}>
					<CommandInput placeholder="Search Icons..." />
					<CommandList>
						<CommandEmpty>No Icons Found.</CommandEmpty>
						<CommandGroup>
							{field.options.map((icon, index) => (
								<Icon key={`${index}-${icon.label}`} icon={icon} index={index} value={value} setValue={setValue} setOpen={setOpen} />
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
