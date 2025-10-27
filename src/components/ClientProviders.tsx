"use client";

import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type PropsWithChildren } from "react";

import { authClient } from "~/auth/client";

export default function ClientProviders({ children }: PropsWithChildren) {
  const router = useRouter();

  return (
    <AuthUIProvider
      authClient={authClient}
      Link={Link}
      navigate={router.push}
      onSessionChange={() => {
        router.refresh();
      }}
      replace={router.replace}
      social={{
        providers: ["google"],
      }}
    >
      {children}
    </AuthUIProvider>
  );
}
