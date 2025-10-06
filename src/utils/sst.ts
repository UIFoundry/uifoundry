import { Resource } from "sst";
import { env } from "~/env.mjs";

export function getEnvVar(name: keyof typeof env): string {
	try {
		// @ts-expect-error unable to read sst Resource types here
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
		return Resource[name]?.value ?? "";
	} catch {
		return env[name];
	}
}

export function getSSTS3BucketName(): string {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
		return ((Resource as any)[env.S3_BUCKET]?.name as string) ?? "";
	} catch {
		return env.S3_BUCKET;
	}
}
