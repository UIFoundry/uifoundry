import Link from "next/link";
import Image from "next/image";
import { cn } from "@/registry/default/utils";

// Registry components use generic types instead of generated types
interface HeaderBrandLogoBlock {
	href: string;
	media?: {
		url: string;
		alt: string;
	};
	alignment?: string;
}

interface Media {
	url: string;
	alt: string;
}

export * from "./config";

export default function HeaderBrandLogo({
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
