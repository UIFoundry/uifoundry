import { redirect } from "next/navigation";

export const DAL_ERRORS = {
	noUser: {
		type: "no-user",
		name: "UserNotFound",
		message: "User Not Found",
	},
	notFound: {
		type: "not-found",
		name: "Resource Not Found",
		message: "Resource Not Found",
	},
	noAccess: {
		type: "no-access",
		name: "NoAccessAllowed",
		message: "User not allowed to perform this action",
	},
	payload: {
		type: "payload",
		name: "PayloadError",
		message: "Payload Error",
	},
	unknown: {
		type: "unknown",
		name: "UnknownError",
		message: "Unknown Error",
	},
} as const;

export type DalErrorType = (typeof DAL_ERRORS)[keyof typeof DAL_ERRORS];

export interface DalError extends Error {
	type: DalErrorType["type"];
}

export type DalReturn<T, E extends DalError = DalError> =
	| {
		success: true;
		data: T;
	}
	| {
		success: false;
		error: E;
	};

export function noUserRedirect<T, E extends DalError>({
	dalReturn,
}: {
	dalReturn: DalReturn<T, E>;
}) {
	if (dalReturn.success) return dalReturn;
	if (dalReturn.error.type === "no-user") return redirect("/auth/sign-in");
	return dalReturn as DalReturn<T, Exclude<E, { type: "no-user" }>>;
}

export function noAccessRedirect<T, E extends DalError>({
	dalReturn,
	redirectPath = "/",
}: {
	dalReturn: DalReturn<T, E>;
	redirectPath?: string;
}) {
	if (dalReturn.success) return dalReturn;
	if (dalReturn.error.type === "no-access") return redirect(redirectPath);
	return dalReturn as DalReturn<T, Exclude<E, { type: "no-access" }>>;
}

export function dalThrowError<T, E extends DalError>({
	dalReturn,
}: {
	dalReturn: DalReturn<T, E>;
}) {
	if (dalReturn.success) return dalReturn;

	throw dalReturn.error;
}

export function verifySuccess<T, E extends DalError>({
	dalReturn,
	redirectPath,
}: {
	dalReturn: DalReturn<T, E>;
	redirectPath?: string;
}) {
	const res = dalThrowError({
		dalReturn: noAccessRedirect({
			dalReturn: noUserRedirect({
				dalReturn: dalReturn,
			}),
			redirectPath,
		}),
	});
	return res.data;
}

// Ergonomic helpers to infer success data type automatically
export const ok = <T>(data: T): DalReturn<T> => ({ success: true, data });
export const err = (
	error: Partial<DalError> = { type: "unknown" },
): DalReturn<never, DalError> => {
	const errBase = { success: false } as const;
	for (const dalErr of Object.values(DAL_ERRORS)) {
		if (error.type === dalErr.type) {
			return {
				...errBase,
				error: {
					...error,
					type: error.type,
					name: error.name ?? dalErr.name,
					message: error.message ?? dalErr.message,
				},
			};
		}
	}

	return {
		...errBase,
		error: {
			...error,
			type: "unknown",
			name: error.name ?? DAL_ERRORS.unknown.name,
			message: error.message ?? DAL_ERRORS.unknown.message,
		},
	};
};
