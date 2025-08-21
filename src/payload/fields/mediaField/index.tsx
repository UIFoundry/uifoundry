import type { Media, MediaField as MediaFieldProps } from "~/payload-types";
import Image from "next/image";
import { cn } from "~/styles/utils";
import type { ComponentPropsWithoutRef } from "react";

export default function MediaField({
	media,
	className,
	...imageProps
}: { media: MediaFieldProps } & ComponentPropsWithoutRef<"img">) {
	return (
		<div>
			{media.dark && (
				<Image
					className={cn(Boolean(media.light) && "hidden dark:block", className)}
					// @ts-expect-error mismatch image url types from payload
					src={(media.dark as Media).url!}
					alt={(media.dark as Media).alt}
					{...imageProps}
				/>
			)}
			{media.light && (
				<Image
					className={cn(Boolean(media.dark) && "dark:hidden", className)}
					// @ts-expect-error mismatch image url types from payload
					src={(media.light as Media).url!}
					alt={(media.light as Media).alt}
					{...imageProps}
				/>
			)}
		</div>
	);
}
