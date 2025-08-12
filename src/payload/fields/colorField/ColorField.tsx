"use client"

import type { TextFieldClientProps } from "payload"
import { useField } from "@payloadcms/ui"
import Sketch from "@uiw/react-color-sketch"

export default function ColorField({ field, path }: TextFieldClientProps) {
	const { value, setValue } = useField({ path })
	return (
		<div>
			<Sketch color={value} onChange={(color) => {
				setValue(color.hex)
			}} />
		</div>
	)
}
