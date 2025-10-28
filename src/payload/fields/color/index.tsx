"use client";

import type { TextFieldClientProps } from "payload";

import { useField } from "@payloadcms/ui";
import Sketch from "@uiw/react-color-sketch";
import { useState } from "react";

import type { TextField } from "~/payload/fields";

import { Button } from "~/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover";

export default function ColorField({
  field,
  path,
}: TextFieldClientProps & { field: TextField & { description?: string } }) {
  const { setValue, value } = useField<string>({ path });
  const [open, setOpen] = useState(false);
  const current = typeof value === "string" && value ? value : "#000000";
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label>
          <span style={{ color: value }}>
            {(field?.label as string)?.toUpperCase()}
          </span>
          {field.required ? <span className="pl-1 text-red-500">*</span> : ""}
          {field?.description ? (
            <p className="text-muted-foreground mt-1 text-xs">
              {field.description}
            </p>
          ) : null}
        </label>
        <Popover onOpenChange={setOpen} open={open}>
          <PopoverTrigger asChild className="mt-2 w-sm cursor-pointer">
            <Button
              aria-expanded={open}
              className="justify-between"
              role="combobox"
              style={{ background: value }}
              variant="outline"
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
