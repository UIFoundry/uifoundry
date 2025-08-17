"use client";

import { Check, ChevronsUpDown, icons } from "lucide-react";
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

import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover";
import { cn } from "~/styles/utils";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "~/ui/button";

type IconName = keyof typeof icons;

function Icon({
  icon,
  index,
  value,
  setValue,
  setOpen,
}: {
  icon: OptionObject;
  index: number;
  value: IconName;
  setValue: (val: unknown, disableModifyingForm?: boolean) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const key = String(icon.value) as IconName;
  const SelectIcon = icons[key];
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
      <SelectIcon />
      {icon.value}
      <Check
        className={cn(
          "ml-auto opacity-0",
          value === String(icon.value) && "opacity-100",
        )}
      />
    </CommandItem>
  );
}

export default function IconField({ field, path }: SelectFieldClientProps) {
  const { value, setValue } = useField<IconName>({ path });
  const [open, setOpen] = useState(false);
  const SelectIcon = icons[value];

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
            {SelectIcon && <SelectIcon />}
            {value ? value : "Select Icon..."}
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
                {(() => {
                  const opts = (field.options as OptionObject[]) ?? [];
                  const selectedIndex = opts.findIndex(
                    (o) => o.value === value,
                  );
                  const selected =
                    selectedIndex > -1 ? opts[selectedIndex] : undefined;
                  const ordered: OptionObject[] = selected
                    ? [selected, ...opts.filter((_, i) => i !== selectedIndex)]
                    : opts;
                  return ordered.map((opt, index) => (
                    <Icon
                      key={`${index}-${String(opt.value)}`}
                      icon={opt}
                      index={index}
                      value={value}
                      setValue={setValue}
                      setOpen={setOpen}
                    />
                  ));
                })()}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
