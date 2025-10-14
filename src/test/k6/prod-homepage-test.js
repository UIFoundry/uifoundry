// @ts-ignore
import http from "k6/http";
import { sleep, check } from "k6";

/**
 * Production Homepage Test - Tests full SSR page on production
 * More realistic load pattern with user think time
 */

const PROD_URL = "https://uifoundry.dev";

export const options = {
	stages: [
		{ duration: "10s", target: 20 }, // Ramp up to 20 users
		{ duration: "30s", target: 20 }, // Stay at 20 users
		{ duration: "10s", target: 50 }, // Ramp up to 50 users
		{ duration: "30s", target: 50 }, // Stay at 50 users
		{ duration: "10s", target: 100 }, // Ramp up to 100 users
		{ duration: "30s", target: 100 }, // Stay at 100 users
		{ duration: "10s", target: 0 }, // Ramp down
	],
	thresholds: {
		http_req_failed: ["rate<0.01"], // Less than 1% errors
		http_req_duration: ["p(95)<2000", "p(99)<5000"], // 95% under 2s, 99% under 5s
	},
};

export default function () {
	const res = http.get(PROD_URL);
	check(res, {
		"status is 200": (r) => r.status === 200,
		"response time < 1s": (r) => r.timings.duration < 1000,
		"response time < 2s": (r) => r.timings.duration < 2000,
		"response time < 5s": (r) => r.timings.duration < 5000,
		"has content": (r) => r.body.length > 1000,
	});

	// Simulate real user behavior - wait between requests
	sleep(1);
}
