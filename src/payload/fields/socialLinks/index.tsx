import Link from "next/link";
import {
	socialIcons,
	type SocialIconKey,
} from "~/ui/icons/social-icons";
import Image, { type ImageProps } from "next/image";
import { cn } from "~/styles/utils";

export default function SocialIcon({
	icon,
	href = "",
	className,
	...imageProps
}: {
	icon: SocialIconKey;
	href?: string;
} & Partial<ImageProps>) {
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
						src={selectIcon.route.light}
						alt={`${icon}`}
						width={20}
						height={20}
						className={cn("dark:hidden", className)}
						{...imageProps}
					/>
				)}
			{typeof selectIcon.route !== "string" &&
				Object.hasOwn(selectIcon.route, "dark") && (
					<Image
						src={selectIcon.route.dark}
						alt={`${icon}`}
						width={20}
						height={20}
						className={cn("hidden dark:block", className)}
						{...imageProps}
					/>
				)}
			{typeof selectIcon.route === "string" && (
				<Image
					src={selectIcon.route}
					alt={`${icon}`}
					width={20}
					height={20}
					className={className}
					{...imageProps}
				/>
			)}
		</Link>
	);
}
