import type { ImageProps } from "next/image";

import Image from "next/image";

import type { Media, MediaField as MediaFieldProps } from "~/payload-types";

import { cn } from "~/styles/utils";

export default function MediaField({
	className,
	media,
	...imageProps
}: Omit<ImageProps, "alt" | "src"> & { media: MediaFieldProps }) {
	return (
		<div>
			{media.dark && (
				<Image
					alt={(media.dark as Media).alt}
					className={cn(Boolean(media.light) && "hidden dark:block", className)}
					src={(media.dark as Media).url!}
					{...imageProps}
				/>
			)}
			{media.light && (
				<Image
					alt={(media.light as Media).alt}
					className={cn(Boolean(media.dark) && "dark:hidden", className)}
					src={(media.light as Media).url!}
					{...imageProps}
				/>
			)}
		</div>
	);
}
