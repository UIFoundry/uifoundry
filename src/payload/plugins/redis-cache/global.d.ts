// Global type augmentation for Payload CMS to add cache support
// Cache options can be passed via the `context` field in any operation

import type { CacheOptions } from "./types";

declare module "payload" {
	// Extend RequestContext to include cache metadata
	interface RequestContext {
		cache?: CacheOptions;
	}
}
