import { redirect } from "next/navigation";

export type DalReturn<T, E extends DalError = DalError> =
	| {
		success: true;
		data: T;
	}
	| {
		success: false;
		error: E;
	};

export const DAL_ERROR_TYPES = {
	noUser: "no-user",
	noAccess: "no-access",
	payload: "payload",
	unknown: "unknown",
} as const;

export type DalErrorType =
	(typeof DAL_ERROR_TYPES)[keyof typeof DAL_ERROR_TYPES];

export interface DalError extends Error {
	type: DalErrorType;
}

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
	switch (error.type) {
		case "no-user":
			return {
				...errBase,
				error: {
					...error,
					type: "no-user",
					name: error.name ?? "UserNotFound",
					message: error.message ?? "User Not Found",
				},
			};
		case "no-access":
			return {
				...errBase,
				error: {
					...error,
					type: "no-access",
					name: error.name ?? "NoAccessAllowed",
					message: error.message ?? "User not allowed to perform this action",
				},
			};
		case "payload":
			return {
				...errBase,
				error: {
					...error,
					type: "payload",
					name: error.name ?? "PayloadError",
					message: error.message ?? "Payload Error",
				},
			};
		default:
			return {
				...errBase,
				error: {
					...error,
					type: "unknown",
					name: error.name ?? "Unknown Error",
					message: error.message ?? "Unknown Error",
				},
			};
	}
};
