"use client"

import { socialIcons, type SocialIcon } from "~/ui/icons/social-icons"
import { Check, ChevronsUpDown } from "lucide-react"
import type { OptionObject, SelectFieldClientProps } from "payload"
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
import Image from "next/image"

function SocialIcon({ icon, index, value, setValue, setOpen }: { icon: OptionObject, index: number, value: SocialIcon, setValue: (val: unknown, disableModifyingForm?: boolean) => void, setOpen: Dispatch<SetStateAction<boolean>> }) {
	const selectIcon = socialIcons[icon.value as SocialIcon]

	return (
		<CommandItem
			value={icon.value}
			onSelect={(currentValue) => {
				setValue(currentValue === value ? "" : currentValue)
				setOpen(false)
			}}
			key={`${index}-${icon.value}`}
			className="hover:bg-neutral-300 transition-colors duration-400 cursor-pointer"
		>
			{typeof selectIcon.route !== "string" && Object.hasOwn(selectIcon.route, "light") &&
				<Image src={selectIcon.route.light} alt={`${icon.value}`} width={20} height={20} className="dark:hidden" />
			}
			{typeof selectIcon.route !== "string" && Object.hasOwn(selectIcon.route, "dark") &&
				<Image src={selectIcon.route.dark} alt={`${icon.value}`} width={20} height={20} className="hidden dark:block" />
			}
			{typeof selectIcon.route === "string" &&
				<Image src={selectIcon.route} alt={`${icon.value}`} width={20} height={20} />
			}
			{icon.value}
			<Check className={cn("ml-auto opacity-0", value === icon.label && "opacity-100")} />
		</CommandItem>
	)
}

export default function SocialIconField({ field, path }: SelectFieldClientProps) {
	const { value, setValue } = useField<SocialIcon>({ path })
	const [open, setOpen] = useState(false)
	const selectIcon = socialIcons[value]

	return (
		<div className="">
			<label>
				{field.label as string}
				{field.required ? <span className="pl-1 text-red-500">*</span> : ""}
			</label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild className="w-full cursor-pointer mt-2">
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="justify-between"
					>
						{selectIcon && <Image src={selectIcon.route as string} alt={`${value}`} width={20} height={20} />}
						{value
							? value
							: "Find Social Link..."}
						<ChevronsUpDown className="opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="bg-neutral-200 w-[var(--radix-popover-trigger-width)] dark:bg-neutral-600">
					<Command value={value}>
						<CommandInput placeholder="Search Icons..." className="border-none" />
						<CommandList>
							<CommandEmpty>No Icons Found.</CommandEmpty>
							<CommandGroup>
								{field.options.map((socialIcon, index) => (
									<SocialIcon key={`${index}-${(socialIcon as OptionObject).value}`} icon={socialIcon as OptionObject} index={index} value={value} setValue={setValue} setOpen={setOpen} />
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	)
}
