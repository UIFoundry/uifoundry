// @ts-ignore
import http from "k6/http";
import { sleep, check } from "k6";

/**
 * Production Stress Test - Push AWS infrastructure to limits
 * Gradually increases load to find breaking point
 */

const PROD_URL = "https://uifoundry.dev";

export const options = {
	stages: [
		{ duration: "1m", target: 50 }, // Ramp up to 50 users over 1 min
		{ duration: "2m", target: 100 }, // Ramp to 100 users over 2 min
		{ duration: "2m", target: 200 }, // Ramp to 200 users over 2 min
		{ duration: "2m", target: 300 }, // Ramp to 300 users over 2 min
		{ duration: "2m", target: 200 }, // Scale down to 200
		{ duration: "1m", target: 0 }, // Ramp down
	],
	thresholds: {
		http_req_failed: ["rate<0.05"], // Less than 5% errors (more lenient for stress test)
		http_req_duration: ["p(90)<3000"], // 90% under 3s
	},
};

export default function () {
	const res = http.get(PROD_URL);
	check(res, {
		"status is 200": (r) => r.status === 200,
		"response time < 3s": (r) => r.timings.duration < 3000,
		"response time < 5s": (r) => r.timings.duration < 5000,
		"response time < 10s": (r) => r.timings.duration < 10000,
	});

	sleep(1);
}
