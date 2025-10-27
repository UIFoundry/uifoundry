"use client";

import Link from "next/link";

import type { HeaderMenuButtonBlock } from "~/payload-types";

import { useSession } from "~/auth/client";
import UserAvatar from "~/components/UserAvatar";
import { cn } from "~/styles/utils";

export default function MenuButton({
	alignment,
	auth,
	href = "",
	label,
	mobileView = false,
	targetBlank,
}: HeaderMenuButtonBlock & { mobileView?: boolean }) {
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
						mobileView === true && "hidden",
					)}
				>
					<Link className="cursor-pointer" href="/auth/sign-in">
						{label}
					</Link>
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
				mobileView === true && "hidden",
			)}
		>
			<Link
				className="cursor-pointer"
				href={href ?? "/home"}
				target={targetBlank ? "_blank" : "_self"}
			>
				{label}
			</Link>
		</div>
	);
}
