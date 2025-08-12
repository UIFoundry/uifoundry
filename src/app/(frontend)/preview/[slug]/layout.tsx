import TailwindVariables from "~/payload/globals/TailwindConfig";

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<TailwindVariables draft />
			{children}
		</>
	);
}
