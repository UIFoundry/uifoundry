import { redirect } from "next/navigation";

export const DAL_ERRORS = {
	noAccess: {
		name: "NoAccessAllowed",
		type: "no-access",
		message: "User not allowed to perform this action",
	},
	notFound: {
		name: "Resource Not Found",
		type: "not-found",
		message: "Resource Not Found",
	},
	noUser: {
		name: "UserNotFound",
		type: "no-user",
		message: "User Not Found",
	},
	payload: {
		name: "PayloadError",
		type: "payload",
		message: "Payload Error",
	},
	unknown: {
		name: "UnknownError",
		type: "unknown",
		message: "Unknown Error",
	},
} as const;

export interface DalError extends Error {
	type: DalErrorType["type"];
}

export type DalErrorType = (typeof DAL_ERRORS)[keyof typeof DAL_ERRORS];

export type DalReturn<T, E extends DalError = DalError> =
	| {
		data: T;
		success: true;
	}
	| {
		error: E;
		success: false;
	};

export function dalThrowError<T, E extends DalError>({
	dalReturn,
}: {
	dalReturn: DalReturn<T, E>;
}) {
	if (dalReturn.success) {return dalReturn;}

	throw dalReturn.error;
}

export function noAccessRedirect<T, E extends DalError>({
	dalReturn,
	redirectPath = "/",
}: {
	dalReturn: DalReturn<T, E>;
	redirectPath?: string;
}) {
	if (dalReturn.success) {return dalReturn;}
	if (dalReturn.error.type === "no-access") {return redirect(redirectPath);}
	return dalReturn as DalReturn<T, Exclude<E, { type: "no-access" }>>;
}

export function noUserRedirect<T, E extends DalError>({
	dalReturn,
}: {
	dalReturn: DalReturn<T, E>;
}) {
	if (dalReturn.success) {return dalReturn;}
	if (dalReturn.error.type === "no-user") {return redirect("/auth/sign-in");}
	return dalReturn as DalReturn<T, Exclude<E, { type: "no-user" }>>;
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
				dalReturn,
			}),
			redirectPath,
		}),
	});
	return res.data;
}

// Ergonomic helpers to infer success data type automatically
export const ok = <T>(data: T): DalReturn<T> => ({ data, success: true });
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
					name: error.name ?? dalErr.name,
					type: error.type,
					message: error.message ?? dalErr.message,
				},
			};
		}
	}

	return {
		...errBase,
		error: {
			...error,
			name: error.name ?? DAL_ERRORS.unknown.name,
			type: "unknown",
			message: error.message ?? DAL_ERRORS.unknown.message,
		},
	};
};
