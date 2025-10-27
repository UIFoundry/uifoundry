"use client";

import type { TypedUser } from "payload";

import { createContext, type ReactNode, useContext } from "react";

import type { Account, DeviceSession, Session } from "~/auth/types";

type UserContextType = {
  currentUserPromise: Promise<null | TypedUser>;
  deviceSessionsPromise: Promise<DeviceSession[] | null>;
  sessionPromise: Promise<null | Session>;
  userAccountsPromise: Promise<Account[] | null>;
};

const BetterAuthContext = createContext<null | UserContextType>(null);

export function BetterAuthProvider({
  children,
  currentUserPromise,
  deviceSessionsPromise,
  sessionPromise,
  userAccountsPromise,
}: {
  children: ReactNode;
  currentUserPromise: Promise<null | TypedUser>;
  deviceSessionsPromise: Promise<DeviceSession[] | null>;
  sessionPromise: Promise<null | Session>;
  userAccountsPromise: Promise<Account[] | null>;
}) {
  return (
    <BetterAuthContext.Provider
      value={{
        currentUserPromise,
        deviceSessionsPromise,
        sessionPromise,
        userAccountsPromise,
      }}
    >
      {children}
    </BetterAuthContext.Provider>
  );
}

export function useBetterAuth(): UserContextType {
  const context = useContext(BetterAuthContext);
  if (context === null) {
    throw new Error("useBetterAuth must be used within a BetterAuthProvider");
  }
  return context;
}
