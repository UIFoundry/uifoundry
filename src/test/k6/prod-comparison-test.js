// @ts-ignore
import http from "k6/http";
import { check, group, sleep } from "k6";

/**
 * Production Comparison Test - Tests multiple endpoints
 * Helps identify where bottlenecks are in production
 */

const PROD_URL = "https://uifoundry.dev";

export const options = {
	stages: [
		{ duration: "10s", target: 30 },
		{ duration: "40s", target: 30 },
		{ duration: "10s", target: 0 },
	],
};

export default function () {
	// Test 1: Health Check (Baseline)
	group("Health Check API", () => {
		const res = http.get(`${PROD_URL}/api/health`);
		check(res, {
			"health 200": (r) => r.status === 200,
			"health < 200ms": (r) => r.timings.duration < 200,
			"health < 500ms": (r) => r.timings.duration < 500,
		});
	});

	sleep(0.5);

	// Test 2: Homepage (Full SSR)
	group("Homepage SSR", () => {
		const res = http.get(PROD_URL);
		check(res, {
			"homepage 200": (r) => r.status === 200,
			"homepage < 1s": (r) => r.timings.duration < 1000,
			"homepage < 2s": (r) => r.timings.duration < 2000,
		});
	});

	sleep(0.5);

	// Test 3: Docs Page (if exists)
	group("Docs Page", () => {
		const res = http.get(`${PROD_URL}/docs`);
		check(res, {
			"docs loaded": (r) => r.status === 200 || r.status === 404,
			"docs < 2s": (r) => r.timings.duration < 2000,
		});
	});

	sleep(1);
}
