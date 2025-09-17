import Link from "next/link";
import type { HeaderBrandLogoBlock, Media } from "~/payload-types";
import Image from "next/image";
import { cn } from "~/styles/utils";

export * from "./config";

export default function MenuButton({
	mobileView = false,
	href = "",
	media,
}: { mobileView?: boolean } & HeaderBrandLogoBlock) {
	if (!media) return <></>;
	return (
		<Link
			href={href}
			className={cn("cursor-pointer", mobileView === true && "hidden")}
		>
			{media ? (
				<Image src={(media as Media).url!} fill alt={(media as Media).alt} />
			) : (
				""
			)}
		</Link>
	);
}
