// @ts-ignore
import http from "k6/http";
import { sleep, check } from "k6";

/**
 * Homepage load test with realistic load
 * Tests full SSR page with all CMS queries
 * Start with lower concurrency to avoid overwhelming dev server
 */
export const options = {
	stages: [
		{ duration: "10s", target: 10 }, // Ramp up slowly to 10 users
		{ duration: "30s", target: 10 }, // Stay at 10 users
		{ duration: "10s", target: 20 }, // Ramp up to 20 users
		{ duration: "30s", target: 20 }, // Stay at 20 users
		{ duration: "10s", target: 0 }, // Ramp down
	],
	thresholds: {
		http_req_failed: ["rate<0.01"], // Less than 1% errors
		http_req_duration: ["p(95)<10000"], // 95% of requests under 10s (relaxed for dev)
	},
};

export default function () {
	const res = http.get("http://localhost:3005");
	check(res, {
		"status is 200": (r) => r.status === 200,
		"response time < 5s": (r) => r.timings.duration < 5000,
		"response time < 10s": (r) => r.timings.duration < 10000,
	});

	// Simulate real user behavior - wait between requests
	sleep(1);
}
