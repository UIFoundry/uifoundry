import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		resolve: {
			alias: {
				"~": path.resolve(__dirname, "./src"),
			},
		},
		test: {
			env: {
				...env,
				SKIP_ENV_VALIDATION: "true", // Skip env validation in tests
				// Mock SST environment variables for testing
				SST_STAGE: "test",
				BUILD_TIME: new Date().toISOString(),
			},
			environment: "node",
			include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
			exclude: [
				"**/node_modules/**",
				"**/dist/**",
				"**/cypress/**",
				"**/tests/**", // Exclude Playwright tests
				"**/.{idea,git,cache,output,temp}/**",
				"**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*",
			],
			setupFiles: ["./src/test/setup.ts"],
		},
		plugins: [tsconfigPaths()],
	};
});
