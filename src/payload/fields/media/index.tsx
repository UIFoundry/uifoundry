import type { Media, MediaField as MediaFieldProps } from "~/payload-types";
import Image from "next/image";
import type { ImageProps } from "next/image";
import { cn } from "~/styles/utils";

export default function MediaField({
	media,
	className,
	...imageProps
}: { media: MediaFieldProps } & Omit<ImageProps, "src" | "alt">) {
	return (
		<div>
			{media.dark && (
				<Image
					className={cn(Boolean(media.light) && "hidden dark:block", className)}
					src={(media.dark as Media).url!}
					alt={(media.dark as Media).alt}
					{...imageProps}
				/>
			)}
			{media.light && (
				<Image
					className={cn(Boolean(media.dark) && "dark:hidden", className)}
					src={(media.light as Media).url!}
					alt={(media.light as Media).alt}
					{...imageProps}
				/>
			)}
		</div>
	);
}
