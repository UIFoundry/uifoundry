/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.mjs";
import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import("next").NextConfig} */
const nextConfig = {
	nodeMiddleware: true,
	serverExternalPackages: ["mongodb"],
	experimental: {
		reactCompiler: true,
	},
	output: "standalone",
};

export default withPayload(nextConfig);
