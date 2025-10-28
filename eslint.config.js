// @ts-check
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
import perfectionist from "eslint-plugin-perfectionist";
import importX from "eslint-plugin-import-x";

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
});

export const defaultESLintIgnores = [
	"**/.temp",
	"**/.git",
	"**/.hg",
	"**/.pnp.*",
	"**/.svn",
	"**/.next",
	"**/.open-next",
	"**/.sst",
	"**/playwright.config.ts",
	"**/vitest.config.ts",
	"**/tsconfig.tsbuildinfo",
	"**/README.md",
	"**/eslint.config.js",
	"**/payload-types.ts",
	"**/dist/",
	"**/.yarn/",
	"**/build/",
	"**/node_modules/",
	"**/temp/",
	"**/registry/",
	"**/public/",
	"**/.source/",
	"**/sst.config.ts",
	"**/sst.workflow.ts",
	"**/src/payload/plugins/",
	"**/src/app/(payload)/admin/importMap.js",
];

export default tseslint.config(
	{
		ignores: defaultESLintIgnores,
	},
	...compat.extends("next/core-web-vitals"),
	// Add perfectionist for object/import sorting (from PayloadCMS config)
	perfectionist.configs["recommended-natural"],
	{
		files: ["**/*.ts", "**/*.tsx"],
		extends: [
			...tseslint.configs.recommended,
			...tseslint.configs.recommendedTypeChecked,
			...tseslint.configs.stylisticTypeChecked,
		],
		plugins: {
			"import-x": importX,
		},
		rules: {
			// UIFoundry-specific rules
			"@typescript-eslint/array-type": "off",
			"@typescript-eslint/ban-tslint-comment": "off",
			"@typescript-eslint/unbound-method": "off",
			"@typescript-eslint/consistent-type-definitions": "off",
			"@typescript-eslint/require-await": "off",

			// Inline type imports (UIFoundry preference)
			"@typescript-eslint/consistent-type-imports": [
				"warn",
				{ prefer: "type-imports", fixStyle: "inline-type-imports" },
			],

			// Unused vars handling
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					destructuredArrayIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^(_|ignore)",
				},
			],

			// Void return checking
			"@typescript-eslint/no-misused-promises": [
				"error",
				{ checksVoidReturn: { attributes: false } },
			],

			// PayloadCMS-inspired rules
			curly: ["warn", "all"],
			"no-console": "off",
			"no-underscore-dangle": "off",
			"object-shorthand": "warn",
			"no-useless-escape": "warn",
			"import-x/no-duplicates": "warn",
			"import-x/prefer-default-export": "off",

			// Allow default exports for Next.js
			"no-restricted-exports": "off",

			// Perfectionist sorting configuration (from PayloadCMS)
			"perfectionist/sort-objects": [
				"error",
				{
					type: "natural",
					order: "asc",
					partitionByComment: true,
					partitionByNewLine: true,
					groups: ["top", "unknown"],
					customGroups: {
						top: ["_id", "id", "name", "slug", "type"],
					},
				},
			],
		},
	},
	{
		// Disable rules for test files and config files
		files: [
			"src/test/**/*.js",
			"src/test/**/*.ts",
			"tests/**/*.ts",
			"*.config.js",
			"*.config.mjs",
		],
		rules: {
			"import/no-anonymous-default-export": "off",
		},
	},
	{
		linterOptions: {
			reportUnusedDisableDirectives: "error",
		},
		languageOptions: {
			parserOptions: {
				project: "./tsconfig.json",
				sourceType: "module",
				ecmaVersion: "latest",
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
);
