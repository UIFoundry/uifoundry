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
    // First try to get the bucket name from SST output (works in production deployments)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    const sstBucketName = (Resource as any)?.bucketName as string;
    if (sstBucketName) {
      return sstBucketName;
    }

    // Fallback: try to access the bucket resource directly
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    const bucketResourceName = (Resource as any)["bucket-uifoundry-media"]
      ?.name as string;
    if (bucketResourceName) {
      return bucketResourceName;
    }
  } catch {
    // SST Resources not available, this is expected in local dev without `sst dev`
  }

  // Fallback to environment variable (used in local development)
  return env.S3_BUCKET;
}
