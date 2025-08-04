import Link from "next/link";
import { socialIcons, type SocialIconKey } from "./social-icons";
import Image from "next/image";

export default function SocialIcon({ icon, href = "" }: { icon: SocialIconKey, href?: string }) {
	const selectIcon = socialIcons[icon]
	if (!selectIcon?.route || selectIcon.route === "") {
		console.log('social icon not found: ', icon)
		return <></>
	}

	return (<Link href={href}>
		{typeof selectIcon.route !== "string" && Object.hasOwn(selectIcon.route, "light") &&
			<Image src={selectIcon.route.light} alt={`${icon}`} width={20} height={20} className="dark:hidden" />
		}
		{typeof selectIcon.route !== "string" && Object.hasOwn(selectIcon.route, "dark") &&
			<Image src={selectIcon.route.dark} alt={`${icon}`} width={20} height={20} className="hidden dark:block" />
		}
		{typeof selectIcon.route === "string" &&
			<Image src={selectIcon.route} alt={`${icon}`} width={20} height={20} />
		}
	</Link>)

}
