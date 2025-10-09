import { type PropsWithChildren } from "react";
import { TRPCReactProvider } from "~/trpc/react";
import { BetterAuthProvider } from "~/auth/context";
import { getContextProps } from "~/auth/utils";
import { ThemeProvider } from "next-themes";

export default function ServerProviders({ children }: PropsWithChildren) {
	return (
		<ThemeProvider>
			<TRPCReactProvider>
				{/* @ts-expect-error todo: fix mismatch collection type causing lsp errors from better auth plugin */}
				<BetterAuthProvider {...getContextProps()}>
					{children}
				</BetterAuthProvider>
			</TRPCReactProvider>
		</ThemeProvider>
	);
}
