import Link from "next/link";
import { socialIcons, type SocialIcon } from "./social-icons";
import Image from "next/image";

export default function SocialIcon({ icon, href }: { icon: SocialIcon, href: string }) {
	const selectIcon = socialIcons[icon]
	if (!selectIcon?.route || selectIcon.route === "") {
		console.log('social icon not found: ', icon)
		return <></>
	}

	return (<Link href={href}>
		<Image src={selectIcon.route as string} alt={`${icon}`} width={20} height={20} />
	</Link>)

}
