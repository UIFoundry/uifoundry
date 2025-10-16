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
	images: {
		remotePatterns: [
			// Local development
			{
				protocol: "http",
				hostname: "localhost",
				port: "3005",
				pathname: "/**",
			},
			// Production domain
			{
				protocol: "https",
				hostname: "uifoundry.dev",
				pathname: "/**",
			},
			// Dev domain
			{
				protocol: "https",
				hostname: "dev.uifoundry.dev",
				pathname: "/**",
			},
			// S3 bucket patterns - specific bucket naming patterns
			{
				protocol: "https",
				hostname: "*.s3.us-west-1.amazonaws.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "s3.us-west-1.amazonaws.com",
				pathname: "/**",
			},
		],
	},
	output: "standalone",
	// Exclude OpenNext and SST working dirs from file tracing to avoid recursion
	outputFileTracingExcludes: {
		"*": ["**/.open-next/**", "**/.sst/**"],
	},
};

export default withPayload(withMDX(nextConfig));
