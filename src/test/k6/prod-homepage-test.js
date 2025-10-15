// @ts-ignore
import http from "k6/http";
import { sleep, check } from "k6";

/**
 * Conservative homepage test with realistic load
 * Lower concurrency to avoid client-side connection issues
 */

const PROD_URL = "https://uifoundry.dev";

export const options = {
	stages: [
		{ duration: "30s", target: 10 }, // Ramp to 10 users
		{ duration: "1m", target: 10 }, // Stay at 10
		{ duration: "30s", target: 20 }, // Ramp to 20 users
		{ duration: "1m", target: 20 }, // Stay at 20
		{ duration: "30s", target: 30 }, // Ramp to 30 users
		{ duration: "1m", target: 30 }, // Stay at 30
		{ duration: "30s", target: 0 }, // Ramp down
	],
	thresholds: {
		http_req_failed: ["rate<0.01"], // Less than 1% errors
		http_req_duration: ["p(95)<1000", "p(99)<2000"], // 95% under 1s, 99% under 2s
	},
};

export default function () {
	const res = http.get(PROD_URL);

	check(res, {
		"status is 200": (r) => r.status === 200,
		"response time < 500ms": (r) => r.timings.duration < 500,
		"response time < 1s": (r) => r.timings.duration < 1000,
		"response time < 2s": (r) => r.timings.duration < 2000,
		"has content": (r) => r.body.length > 1000,
	});

	// Simulate real user think time
	sleep(1);
}
