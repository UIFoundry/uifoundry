// @ts-ignore
import http from "k6/http";
import { check } from "k6";

/**
 * Production Baseline Test - Tests minimal API endpoint on production
 * This establishes baseline Next.js performance on AWS
 */

const PROD_URL = "https://uifoundry.dev";

export const options = {
	stages: [
		{ duration: "10s", target: 50 }, // Ramp up to 50 users
		{ duration: "30s", target: 50 }, // Stay at 50 users
		{ duration: "10s", target: 100 }, // Ramp up to 100 users
		{ duration: "30s", target: 100 }, // Stay at 100 users
		{ duration: "10s", target: 0 }, // Ramp down
	],
	thresholds: {
		http_req_failed: ["rate<0.01"], // Less than 1% errors
		http_req_duration: ["p(95)<500", "p(99)<1000"], // 95% under 500ms, 99% under 1s
	},
};

const tests = () => {
	const res = http.get(`${PROD_URL}/api/health`);
	check(res, {
		"status is 200": (r) => r.status === 200,
		"response time < 200ms": (r) => r.timings.duration < 200,
		"response time < 500ms": (r) => r.timings.duration < 500,
		"response time < 1000ms": (r) => r.timings.duration < 1000,
	});
};
export default tests;
