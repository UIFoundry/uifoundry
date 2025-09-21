import type { Site, Page, User, Theme, Media } from "~/payload-types";
import {
	COLLECTION_SLUG_PAGES,
	COLLECTION_SLUG_SITES,
	COLLECTION_SLUG_THEMES,
	COLLECTION_SLUG_USERS,
	COLLECTION_SLUG_MEDIA,
} from "~/payload/constants";

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
	users: COLLECTION_SLUG_USERS,
	media: COLLECTION_SLUG_MEDIA,
	themes: COLLECTION_SLUG_THEMES,
	sites: COLLECTION_SLUG_SITES,
	pages: COLLECTION_SLUG_PAGES,
} as const;
export type Resource = (typeof RESOURCES)[keyof typeof RESOURCES];

export type Permissions = {
	[COLLECTION_SLUG_USERS]: {
		dataType: User;
		action: AuthAction;
	};
	[COLLECTION_SLUG_MEDIA]: {
		dataType: Media;
		action: AuthAction;
	};
	[COLLECTION_SLUG_THEMES]: {
		dataType: Theme;
		action: AuthAction;
	};
	[COLLECTION_SLUG_SITES]: {
		dataType: Site;
		action: AuthAction;
	};
	[COLLECTION_SLUG_PAGES]: {
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
		[COLLECTION_SLUG_USERS]: {
			create: true,
			read: true,
			update: true,
			delete: true,
		},
		[COLLECTION_SLUG_MEDIA]: {
			create: true,
			read: true,
			update: true,
			delete: true,
		},
		[COLLECTION_SLUG_THEMES]: {
			create: true,
			read: true,
			update: true,
			delete: true,
		},
		[COLLECTION_SLUG_SITES]: {
			create: true,
			read: true,
			update: true,
			delete: true,
		},
		[COLLECTION_SLUG_PAGES]: {
			create: true,
			read: true,
			update: true,
			delete: true,
		},
	},
	[USER_ROLES.user]: {
		[COLLECTION_SLUG_USERS]: {
			create: false,
			read: ({ user, data }) => user.id === data.id,
			update: ({ user, data }) => user.id === data.id,
			delete: ({ user, data }) => user.id === data.id,
		},
		[COLLECTION_SLUG_MEDIA]: {
			create: true,
			read: ({ user, data: media }) => user.id === media.id,
			update: ({ user, data: media }) => user.id === media.id,
			delete: ({ user, data: media }) => user.id === media.id,
		},
		[COLLECTION_SLUG_THEMES]: {
			create: true,
			read: ({ user, data: theme }) => {
				if (typeof theme.owner === "string") {
					return theme.owner === user.id;
				}
				return theme.owner?.id === user.id;
			},
			update: ({ user, data: theme }) => {
				if (typeof theme.owner === "string") {
					return theme.owner === user.id;
				}
				return theme.owner?.id === user.id;
			},
			delete: ({ user, data: theme }) => {
				if (typeof theme.owner === "string") {
					return theme.owner === user.id;
				}
				return theme.owner?.id === user.id;
			},
		},
		[COLLECTION_SLUG_SITES]: {
			// todo: implement max number of sites here for public users on free tier
			create: true,
			read: ({ user, data: site }) => {
				if (typeof site.owner === "string") {
					return site.owner === user.id;
				}
				return site.owner?.id === user.id;
			},
			update: ({ user, data: site }) => {
				if (typeof site.owner === "string") {
					return site.owner === user.id;
				}
				return site.owner?.id === user.id;
			},
			delete: ({ user, data: site }) => {
				if (typeof site.owner === "string") {
					return site.owner === user.id;
				}
				return site.owner?.id === user.id;
			},
		},
		[COLLECTION_SLUG_PAGES]: {
			create: false,
			read: ({ user, data: page }) => {
				if (typeof page.owner === "string") {
					return page.owner === user.id;
				}
				return page.owner?.id === user.id;
			},
			update: ({ user, data: page }) => {
				if (typeof page.owner === "string") {
					return page.owner === user.id;
				}
				return page.owner?.id === user.id;
			},
			delete: ({ user, data: page }) => {
				if (typeof page.owner === "string") {
					return page.owner === user.id;
				}
				return page.owner?.id === user.id;
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
	user?: User | null;
	resource: Resource;
	action: Permissions[Resource]["action"];
	data?: Permissions[Resource]["dataType"];
}): boolean {
	if (!user?.role) return false;

	const permission = (ROLES as RolesWithPermissions)[user.role][resource]?.[
		action
	];

	if (!permission) return false;

	if (typeof permission === "boolean") return permission;

	return data != null && permission({ user, data });
}
