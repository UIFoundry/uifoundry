import type { Media } from "~/payload-types";
import Image, { type ImageProps } from "next/image";
import { cn } from "~/styles/utils";

export default function UploadField({
	media,
	className,
	...imageProps
}: { media: string | Media | null | undefined } & Omit<ImageProps, "src" | "alt">) {
	return (
		<div>
			{media && (
				<Image
					className={cn("block", className)}
					src={(media as Media).url!}
					alt={(media as Media).alt}
					{...imageProps}
				/>
			)}
		</div>
	);
}
