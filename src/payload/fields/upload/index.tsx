import Image, { type ImageProps } from "next/image";

import type { Media } from "~/payload-types";

import { cn } from "~/styles/utils";

export default function UploadField({
	className,
	media,
	...imageProps
}: Omit<ImageProps, "alt" | "src"> & { media: Media | null | string | undefined }) {
	return (
		<div>
			{media && (
				<Image
					alt={(media as Media).alt}
					className={cn("block", className)}
					src={(media as Media).url!}
					{...imageProps}
				/>
			)}
		</div>
	);
}
