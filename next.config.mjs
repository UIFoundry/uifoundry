/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.mjs";
import { withPayload } from "@payloadcms/next/withPayload";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import("next").NextConfig} */
const nextConfig = {
	serverExternalPackages: ["mongodb"],
	experimental: {
		reactCompiler: true,
	},
	images: {
		remotePatterns: [new URL(`http://localhost:3001/**`)],
	},
	output: "standalone",
};

export default withPayload(withMDX(nextConfig));
