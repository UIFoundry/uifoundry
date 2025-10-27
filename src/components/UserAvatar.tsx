import type { User } from "~/payload-types";

import { useSession } from "~/auth/client";
import { Avatar, AvatarFallback, AvatarImage } from "~/ui/avatar";
import { getInitials } from "~/utils";

export default function UserAvatar({
	showUsername = false,
	user,
}: {
	showUsername?: boolean;
	user?: User;
}) {
	const { data: session } = useSession();

	const currentUser = user ?? session?.user;

	if (!currentUser) {return <></>;}

	if (showUsername) {
		return (
			<div className="grid place-items-center">
				<Avatar>
					<AvatarImage
						alt="Profile image"
						src={currentUser.image ?? undefined}
					/>
					<AvatarFallback>
						{getInitials(currentUser.name, 2).toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<p>{currentUser.name}</p>
			</div>
		);
	}

	return (
		<Avatar>
			<AvatarImage alt="Profile image" src={currentUser.image ?? undefined} />
			<AvatarFallback>
				{getInitials(currentUser.name, 2).toUpperCase()}
			</AvatarFallback>
		</Avatar>
	);
}
