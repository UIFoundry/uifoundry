import Image, { type ImageProps } from "next/image";
import Link from "next/link";

import { cn } from "~/styles/utils";
import {
	type SocialIconKey,
	socialIcons,
} from "~/ui/icons/social-icons";

export default function SocialIcon({
	className,
	href = "",
	icon,
	...imageProps
}: Partial<ImageProps> & {
	href?: string;
	icon: SocialIconKey;
}) {
	const selectIcon = socialIcons[icon];
	if (!selectIcon?.route || selectIcon.route === "") {
		console.log("social icon not found: ", icon);
		return <></>;
	}

	return (
		<Link href={href}>
			{typeof selectIcon.route !== "string" &&
				Object.hasOwn(selectIcon.route, "light") && (
					<Image
						alt={`${icon}`}
						className={cn("dark:hidden", className)}
						height={20}
						src={selectIcon.route.light}
						width={20}
						{...imageProps}
					/>
				)}
			{typeof selectIcon.route !== "string" &&
				Object.hasOwn(selectIcon.route, "dark") && (
					<Image
						alt={`${icon}`}
						className={cn("hidden dark:block", className)}
						height={20}
						src={selectIcon.route.dark}
						width={20}
						{...imageProps}
					/>
				)}
			{typeof selectIcon.route === "string" && (
				<Image
					alt={`${icon}`}
					className={className}
					height={20}
					src={selectIcon.route}
					width={20}
					{...imageProps}
				/>
			)}
		</Link>
	);
}
