import type { Account, DeviceSession, Session } from "~/auth/types";
import { headers as requestHeaders } from "next/headers";
import { auth } from "~/auth";
import type { User } from "better-auth";

export const getSession = async () => {
  const headers = await requestHeaders();
  const session = await auth.api.getSession({ headers });
  return session;
};

export const validateSession = async (session: Session) => {
  if (!session?.session || !session.user) {
    return {
      valid: false,
      error: "invalid session or user",
    };
  }
  if (session.session.expiresAt.getTime() <= Date.now()) {
    return {
      valid: false,
      error: "session expired",
    };
  }

  // Check if user is banned - with proper null checking
  if (session.user && "banned" in session.user && session.user.banned) {
    return {
      valid: false,
      error: "banned user",
    };
  }

  return {
    valid: true,
  };
};

export const getUserAccounts = async (): Promise<Account[]> => {
  const headers = await requestHeaders();
  const accounts = await auth.api.listUserAccounts({ headers });
  return accounts;
};

export const getDeviceSessions = async (): Promise<DeviceSession[]> => {
  const headers = await requestHeaders();
  const sessions = await auth.api.listSessions({ headers });
  return sessions;
};

export const currentUser = async () => {
  const headers = await requestHeaders();
  const session = await auth.api.getSession({ headers });
  return (session?.user as User) ?? null;
};

export const getContextProps = () => {
  const sessionPromise = getSession();
  const userAccountsPromise = getUserAccounts();
  const deviceSessionsPromise = getDeviceSessions();
  const currentUserPromise = currentUser();
  return {
    sessionPromise,
    userAccountsPromise,
    deviceSessionsPromise,
    currentUserPromise,
  };
};
