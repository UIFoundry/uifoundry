import Link from "next/link";
import type { HeaderMenuItemsBlock } from "~/payload-types";
import { cn } from "~/styles/utils";

export default function MenuItems({
	mobileView = false,
	menuItems,
}: { mobileView?: boolean } & HeaderMenuItemsBlock) {
	return (
		<div className={cn("hidden lg:block", mobileView === true && "block")}>
			<ul
				className={cn(
					"flex gap-8 text-sm",
					mobileView === true && "flex-col gap-4 text-center",
				)}
			>
				{menuItems.map((item, index) => (
					<li key={index}>
						<Link
							href={item.href}
							className="text-muted-foreground hover:text-primary block duration-300"
						>
							<span>{item.label}</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
