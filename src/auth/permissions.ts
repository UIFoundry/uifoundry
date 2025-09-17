import type { Site, Page, User, Theme } from "~/payload-types";

export const USER_ROLES = {
	user: "user",
	admin: "admin",
} as const;
export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const AUTH_ACTIONS = {
	create: "create",
	read: "read",
	update: "update",
	delete: "delete",
} as const;
export type AuthAction = (typeof AUTH_ACTIONS)[keyof typeof AUTH_ACTIONS];

export const RESOURCES = {
	users: "users",
	themes: "themes",
	sites: "sites",
	pages: "pages",
} as const;
export type Resource = (typeof RESOURCES)[keyof typeof RESOURCES];

export type Permissions = {
	users: {
		dataType: User;
		action: AuthAction;
	};
	themes: {
		dataType: Theme;
		action: AuthAction;
	};
	sites: {
		dataType: Site;
		action: AuthAction;
	};
	pages: {
		dataType: Page;
		action: AuthAction;
	};
};

type PermissionCheck<Key extends keyof Permissions> =
	| boolean
	| (({
		user,
		data,
	}: {
		user: User;
		data: Permissions[Key]["dataType"];
	}) => boolean);

export type RolesWithPermissions = Record<
	UserRole,
	Partial<{
		[Key in keyof Permissions]: Partial<
			Record<Permissions[Key]["action"], PermissionCheck<Key>>
		>;
	}>
>;

// type PermissionDataTypeExcluding<K extends keyof Permissions> = Permissions[Exclude<keyof Permissions, K>]["dataType"];
// usage: T extends PermissionDataTypeExcluding<"orgs" | "users">

const ROLES = {
	[USER_ROLES.admin]: {
		users: {
			create: true,
			read: true,
			update: true,
			delete: true,
		},
		themes: {
			create: true,
			read: true,
			update: true,
			delete: true,
		},
		sites: {
			create: true,
			read: true,
			update: true,
			delete: true,
		},
		pages: {
			create: true,
			read: true,
			update: true,
			delete: true,
		},
	},
	[USER_ROLES.user]: {
		users: {
			create: false,
			read: ({ user, data }) => user.id === data.id,
			update: ({ user, data }) => user.id === data.id,
			delete: ({ user, data }) => user.id === data.id,
		},
		themes: {
			create: true,
			read: ({ user, data }) => {
				if (typeof data.owner === "string") {
					return data.owner === user.id;
				}
				return data.owner?.id === user.id;
			},
			update: ({ user, data }) => {
				if (typeof data.owner === "string") {
					return data.owner === user.id;
				}
				return data.owner?.id === user.id;
			},
			delete: ({ user, data }) => {
				if (typeof data.owner === "string") {
					return data.owner === user.id;
				}
				return data.owner?.id === user.id;
			},
		},
		sites: {
			// todo: implement max number of sites here for public users on free tier
			create: true,
			read: ({ user, data }) => {
				if (typeof data.owner === "string") {
					return data.owner === user.id;
				}
				return data.owner?.id === user.id;
			},
			update: ({ user, data }) => {
				if (typeof data.owner === "string") {
					return data.owner === user.id;
				}
				return data.owner?.id === user.id;
			},
			delete: ({ user, data }) => {
				if (typeof data.owner === "string") {
					return data.owner === user.id;
				}
				return data.owner?.id === user.id;
			},
		},
		pages: {
			create: false,
			read: ({ user, data }) => {
				if (typeof data.owner === "string") {
					return data.owner === user.id;
				}
				return data.owner?.id === user.id;
			},
			update: ({ user, data }) => {
				if (typeof data.owner === "string") {
					return data.owner === user.id;
				}
				return data.owner?.id === user.id;
			},
			delete: ({ user, data }) => {
				if (typeof data.owner === "string") {
					return data.owner === user.id;
				}
				return data.owner?.id === user.id;
			},
		},
	},
} as const satisfies RolesWithPermissions;

export function hasPermission<Resource extends keyof Permissions>({
	user,
	resource,
	action,
	data,
}: {
	user: User;
	resource: Resource;
	action: Permissions[Resource]["action"];
	data?: Permissions[Resource]["dataType"];
}) {
	if (!user?.role) return false;

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const permission = // @ts-expect-error permission types are valid here
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		(ROLES as RolesWithPermissions)[user.role](resource)?.[action];

	if (permission === null) return false;

	if (typeof permission === "boolean") return permission;

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
	return data != null && permission({ user, data });
}
