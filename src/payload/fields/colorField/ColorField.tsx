"use client";

import type { TextFieldClientProps } from "payload";
import { useField } from "@payloadcms/ui";
import Sketch from "@uiw/react-color-sketch";
import { Popover, PopoverTrigger, PopoverContent } from "~/ui/popover";
import { Button } from "~/ui/button";
import { useState } from "react";
import type { TextField } from "~/payload/fields";

export default function ColorField({
  field,
  path,
}: { field: { description?: string } & TextField } & TextFieldClientProps) {
  const { value, setValue } = useField<string>({ path });
  const [open, setOpen] = useState(false);
  const current = typeof value === "string" && value ? value : "#000000";
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label>
          <span style={{ color: value }}>
            {(field?.label as string)?.toUpperCase()}
          </span>
          {field.required ? (
            <span className="text-destructive pl-1">*</span>
          ) : (
            ""
          )}
          {field?.description ? (
            <p className="text-muted-foreground mt-1 text-xs">
              {field.description}
            </p>
          ) : null}
        </label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className="mt-2 w-sm cursor-pointer">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between"
              style={{ background: value }}
            >
              {value}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="border-none">
            <Sketch
              color={current}
              onChange={(color) => {
                setValue(color.hex);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <hr />
    </div>
  );
}
