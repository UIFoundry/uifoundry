import type {
	Footer,
	Header,
	Media,
	Page,
	Site,
	Theme,
	User,
} from "~/payload-types";

import {
	COLLECTION_SLUG_FOOTERS,
	COLLECTION_SLUG_HEADERS,
	COLLECTION_SLUG_MEDIA,
	COLLECTION_SLUG_PAGES,
	COLLECTION_SLUG_SITES,
	COLLECTION_SLUG_THEMES,
	COLLECTION_SLUG_USERS,
} from "~/payload/constants";

export const USER_ROLES = {
	admin: "admin",
	user: "user",
} as const;
export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const AUTH_ACTIONS = {
	create: "create",
	delete: "delete",
	read: "read",
	update: "update",
} as const;
export type AuthAction = (typeof AUTH_ACTIONS)[keyof typeof AUTH_ACTIONS];

export const RESOURCES = {
	footers: COLLECTION_SLUG_FOOTERS,
	headers: COLLECTION_SLUG_HEADERS,
	media: COLLECTION_SLUG_MEDIA,
	pages: COLLECTION_SLUG_PAGES,
	sites: COLLECTION_SLUG_SITES,
	themes: COLLECTION_SLUG_THEMES,
	users: COLLECTION_SLUG_USERS,
} as const;
export type Permissions = {
	[COLLECTION_SLUG_FOOTERS]: {
		action: AuthAction;
		dataType: Footer;
	};
	[COLLECTION_SLUG_HEADERS]: {
		action: AuthAction;
		dataType: Header;
	};
	[COLLECTION_SLUG_MEDIA]: {
		action: AuthAction;
		dataType: Media;
	};
	[COLLECTION_SLUG_PAGES]: {
		action: AuthAction;
		dataType: Page;
	};
	[COLLECTION_SLUG_SITES]: {
		action: AuthAction;
		dataType: Site;
	};
	[COLLECTION_SLUG_THEMES]: {
		action: AuthAction;
		dataType: Theme;
	};
	[COLLECTION_SLUG_USERS]: {
		action: AuthAction;
		dataType: User;
	};
};

export type Resource = (typeof RESOURCES)[keyof typeof RESOURCES];

export type RolesWithPermissions = Record<
	UserRole,
	Partial<{
		[Key in keyof Permissions]: Partial<
			Record<Permissions[Key]["action"], PermissionCheck<Key>>
		>;
	}>
>;

type PermissionCheck<Key extends keyof Permissions> =
	| (({
		data,
		user,
	}: {
		data: Permissions[Key]["dataType"];
		user: User;
	}) => boolean)
	| boolean;

// type PermissionDataTypeExcluding<K extends keyof Permissions> = Permissions[Exclude<keyof Permissions, K>]["dataType"];
// usage: T extends PermissionDataTypeExcluding<"orgs" | "users">

const ROLES = {
	[USER_ROLES.admin]: {
		[COLLECTION_SLUG_FOOTERS]: {
			create: true,
			delete: true,
			read: true,
			update: true,
		},
		[COLLECTION_SLUG_HEADERS]: {
			create: true,
			delete: true,
			read: true,
			update: true,
		},
		[COLLECTION_SLUG_MEDIA]: {
			create: true,
			delete: true,
			read: true,
			update: true,
		},
		[COLLECTION_SLUG_PAGES]: {
			create: true,
			delete: true,
			read: true,
			update: true,
		},
		[COLLECTION_SLUG_SITES]: {
			create: true,
			delete: true,
			read: true,
			update: true,
		},
		[COLLECTION_SLUG_THEMES]: {
			create: true,
			delete: true,
			read: true,
			update: true,
		},
		[COLLECTION_SLUG_USERS]: {
			create: true,
			delete: true,
			read: true,
			update: true,
		},
	},
	[USER_ROLES.user]: {
		[COLLECTION_SLUG_FOOTERS]: {
			create: true,
			delete: ({ data: footer, user }) => {
				if (typeof footer.owner === "string") {
					return footer.owner === user.id;
				}
				return footer.owner?.id === user.id;
			},
			read: ({ data: footer, user }) => {
				if (typeof footer.owner === "string") {
					return footer.owner === user.id;
				}
				return footer.owner?.id === user.id;
			},
			update: ({ data: footer, user }) => {
				if (typeof footer.owner === "string") {
					return footer.owner === user.id;
				}
				return footer.owner?.id === user.id;
			},
		},
		[COLLECTION_SLUG_HEADERS]: {
			create: true,
			delete: ({ data: header, user }) => {
				if (typeof header.owner === "string") {
					return header.owner === user.id;
				}
				return header.owner?.id === user.id;
			},
			read: ({ data: header, user }) => {
				if (typeof header.owner === "string") {
					return header.owner === user.id;
				}
				return header.owner?.id === user.id;
			},
			update: ({ data: header, user }) => {
				if (typeof header.owner === "string") {
					return header.owner === user.id;
				}
				return header.owner?.id === user.id;
			},
		},
		[COLLECTION_SLUG_MEDIA]: {
			create: true,
			delete: ({ data: media, user }) => user.id === media.id,
			read: ({ data: media, user }) => user.id === media.id,
			update: ({ data: media, user }) => user.id === media.id,
		},
		[COLLECTION_SLUG_PAGES]: {
			create: false,
			delete: ({ data: page, user }) => {
				if (typeof page.owner === "string") {
					return page.owner === user.id;
				}
				return page.owner?.id === user.id;
			},
			read: ({ data: page, user }) => {
				if (typeof page.owner === "string") {
					return page.owner === user.id;
				}
				return page.owner?.id === user.id;
			},
			update: ({ data: page, user }) => {
				if (typeof page.owner === "string") {
					return page.owner === user.id;
				}
				return page.owner?.id === user.id;
			},
		},
		[COLLECTION_SLUG_SITES]: {
			// todo: implement max number of sites here for public users on free tier
			create: true,
			delete: ({ data: site, user }) => {
				if (typeof site.owner === "string") {
					return site.owner === user.id;
				}
				return site.owner?.id === user.id;
			},
			read: ({ data: site, user }) => {
				if (typeof site.owner === "string") {
					return site.owner === user.id;
				}
				return site.owner?.id === user.id;
			},
			update: ({ data: site, user }) => {
				if (typeof site.owner === "string") {
					return site.owner === user.id;
				}
				return site.owner?.id === user.id;
			},
		},
		[COLLECTION_SLUG_THEMES]: {
			create: true,
			delete: ({ data: theme, user }) => {
				if (typeof theme.owner === "string") {
					return theme.owner === user.id;
				}
				return theme.owner?.id === user.id;
			},
			read: ({ data: theme, user }) => {
				if (typeof theme.owner === "string") {
					return theme.owner === user.id;
				}
				return theme.owner?.id === user.id;
			},
			update: ({ data: theme, user }) => {
				if (typeof theme.owner === "string") {
					return theme.owner === user.id;
				}
				return theme.owner?.id === user.id;
			},
		},
		[COLLECTION_SLUG_USERS]: {
			create: false,
			delete: ({ data, user }) => user.id === data.id,
			read: ({ data, user }) => user.id === data.id,
			update: ({ data, user }) => user.id === data.id,
		},
	},
} as const satisfies RolesWithPermissions;

export function hasPermission<Resource extends keyof Permissions>({
	action,
	data,
	resource,
	user,
}: {
	action: Permissions[Resource]["action"];
	data?: Permissions[Resource]["dataType"];
	resource: Resource;
	user?: null | User;
}): boolean {
	if (!user?.role) {return false;}

	const permission = (ROLES as RolesWithPermissions)[user.role][resource]?.[
		action
	];

	if (!permission) {return false;}

	if (typeof permission === "boolean") {return permission;}

	return data != null && permission({ data, user });
}
