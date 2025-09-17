import type { auth } from "~/auth";
import type { UserRole } from "./permissions";

export type Session = typeof auth.$Infer.Session & { user: { role: UserRole } };
export type User = (typeof auth.$Infer.Session)["user"];
export type Account = Awaited<
	ReturnType<typeof auth.api.listUserAccounts>
>[number];
export type DeviceSession = Awaited<
	ReturnType<typeof auth.api.listSessions>
>[number];
