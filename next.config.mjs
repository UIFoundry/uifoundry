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
	images: {
		remotePatterns: [
			// Local development
			{
				hostname: "localhost",
				pathname: "/**",
				port: "3005",
				protocol: "http",
			},
			// Production domain
			{
				hostname: "uifoundry.dev",
				pathname: "/**",
				protocol: "https",
			},
			// Dev domain
			{
				hostname: "dev.uifoundry.dev",
				pathname: "/**",
				protocol: "https",
			},
			// S3 bucket patterns - specific bucket naming patterns
			{
				hostname: "*.s3.us-west-1.amazonaws.com",
				pathname: "/**",
				protocol: "https",
			},
			{
				hostname: "s3.us-west-1.amazonaws.com",
				pathname: "/**",
				protocol: "https",
			},
		],
	},
	output: "standalone",
	// Exclude OpenNext and SST working dirs from file tracing to avoid recursion
	outputFileTracingExcludes: {
		"*": ["**/.open-next/**", "**/.sst/**"],
	},
	serverExternalPackages: ["mongodb"],
};

export default withPayload(withMDX(nextConfig));
