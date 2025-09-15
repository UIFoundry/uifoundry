"use client";

import Link from "next/link";
import type { HeaderMenuButtonBlock } from "~/payload-types";
import { signIn, useSession } from "~/auth/client";
import { Button } from "~/ui/button";
import { cn } from "~/styles/utils";
import UserAvatar from "~/components/UserAvatar";

export default function MenuButton({
	isMobile = false,
	label,
	href = "",
	targetBlank,
	alignment,
	auth,
}: { isMobile: boolean } & HeaderMenuButtonBlock) {
	const { data: session } = useSession();
	if (auth) {
		if (!session?.user) {
			return (
				<div
					className={cn(
						alignment === "left"
							? "self-start"
							: alignment === "right"
								? "self-end"
								: "self-center",
						isMobile === true && "hidden",
					)}
				>
					<Button
						className="cursor-pointer"
						onClick={() => {
							if (auth.provider) {
								return signIn.social({ provider: auth.provider });
							}
						}}
					>
						{label}
					</Button>
				</div>
			);
		}

		return (
			<div className="flex">
				<UserAvatar />
			</div>
		);
	}

	return (
		<div
			className={cn(
				alignment === "left"
					? "self-start"
					: alignment === "right"
						? "self-end"
						: "self-center",
				isMobile === true && "hidden",
			)}
		>
			<Link
				target={targetBlank ? "_blank" : "_self"}
				href={href ?? "/home"}
				className="cursor-pointer"
			>
				{label}
			</Link>
		</div>
	);
}
