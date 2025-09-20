import { AuthView } from "@daveyplate/better-auth-ui";
import { Dialog, DialogContent } from "~/ui/dialog";

export default function AuthCard({ pathname }: { pathname: string }) {
	return (
		<main>
			<Dialog open>
				<DialogContent
					className="grid place-items-center border-none bg-transparent shadow-none"
					showCloseButton={false}
				>
					<AuthView path={pathname} />
				</DialogContent>
			</Dialog>
		</main>
	);
}
