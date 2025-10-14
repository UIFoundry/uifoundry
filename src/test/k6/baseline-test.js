// @ts-ignore
import http from "k6/http";
import { sleep, check } from "k6";

/**
 * Baseline performance test - tests minimal API endpoint
 * This helps establish a baseline for Next.js performance without CMS/DB overhead
 */
export const options = {
	stages: [
		{ duration: "5s", target: 50 }, // Ramp up to 50 users
		{ duration: "20s", target: 50 }, // Stay at 50 users
		{ duration: "5s", target: 0 }, // Ramp down
	],
};

const tests = () => {
	const res = http.get("http://localhost:3005/api/health");
	check(res, {
		"status is 200": (r) => r.status === 200,
		"response time < 500ms": (r) => r.timings.duration < 500,
		"response time < 1000ms": (r) => r.timings.duration < 1000,
	});
};

export default tests;
