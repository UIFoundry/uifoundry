import Image from "next/image";
import Link from "next/link";

import type { HeaderBrandLogoBlock, Media } from "~/payload-types";

import { cn } from "~/styles/utils";

export * from "./config";

export default function MenuButton({
	href = "",
	media,
	mobileView = false,
}: HeaderBrandLogoBlock & { mobileView?: boolean }) {
	if (!media) {return <></>;}
	return (
		<Link
			className={cn("cursor-pointer", mobileView === true && "hidden")}
			href={href}
		>
			{media ? (
				<Image alt={(media as Media).alt} fill src={(media as Media).url!} />
			) : (
				""
			)}
		</Link>
	);
}
