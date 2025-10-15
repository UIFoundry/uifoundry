// @ts-ignore
import http from "k6/http";
import { check, sleep } from "k6";

/**
 * Conservative production test with realistic load
 * Lower concurrency to avoid client-side issues
 */

const PROD_URL = "https://uifoundry.dev";

export const options = {
	stages: [
		{ duration: "30s", target: 20 }, // Slowly ramp to 20 users
		{ duration: "1m", target: 20 }, // Stay at 20 users
		{ duration: "30s", target: 50 }, // Ramp to 50 users
		{ duration: "1m", target: 50 }, // Stay at 50 users
		{ duration: "30s", target: 0 }, // Ramp down
	],
	thresholds: {
		http_req_failed: ["rate<0.01"], // Less than 1% errors
		http_req_duration: ["p(95)<200", "p(99)<500"], // Tighter thresholds
	},
};

export default function () {
	const res = http.get(`${PROD_URL}/api/health`);

	check(res, {
		"status is 200": (r) => r.status === 200,
		"response time < 100ms": (r) => r.timings.duration < 100,
		"response time < 200ms": (r) => r.timings.duration < 200,
		"response time < 500ms": (r) => r.timings.duration < 500,
	});

	// Add sleep to simulate real user behavior and avoid hammering
	sleep(1);
}
