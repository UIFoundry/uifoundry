import { Avatar, AvatarImage, AvatarFallback } from "~/ui/avatar";
import { getInitials } from "~/utils";
import type { User } from "~/payload-types";
import { useSession } from "~/auth/client";

export default function UserAvatar({
	user,
	showUsername = false,
}: {
	user?: User;
	showUsername?: boolean;
}) {
	const { data: session } = useSession();

	const currentUser = user ?? session?.user;

	if (!currentUser) return <></>;

	if (showUsername) {
		return (
			<div className="grid place-items-center">
				<Avatar>
					<AvatarImage
						src={currentUser.image ?? undefined}
						alt="Profile image"
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
			<AvatarImage src={currentUser.image ?? undefined} alt="Profile image" />
			<AvatarFallback>
				{getInitials(currentUser.name, 2).toUpperCase()}
			</AvatarFallback>
		</Avatar>
	);
}
