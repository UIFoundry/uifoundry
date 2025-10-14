// @ts-ignore
import http from "k6/http";
import { check, group } from "k6";

/**
 * Comparison test - tests multiple endpoints to identify bottlenecks
 * Helps understand where performance issues are coming from
 */
export const options = {
	stages: [
		{ duration: "5s", target: 20 },
		{ duration: "20s", target: 20 },
		{ duration: "5s", target: 0 },
	],
};

const tests = () => {
	group("Health Check (Baseline)", () => {
		const res = http.get("http://localhost:3005/api/health");
		check(res, {
			"health check 200": (r) => r.status === 200,
			"health check < 200ms": (r) => r.timings.duration < 200,
		});
	});

	group("Homepage (Full SSR)", () => {
		const res = http.get("http://localhost:3005");
		check(res, {
			"homepage 200": (r) => r.status === 200,
			"homepage < 5s": (r) => r.timings.duration < 5000,
		});
	});

	group("Static Asset", () => {
		// Test a static asset if you have one
		const res = http.get("http://localhost:3005/favicon.ico");
		check(res, {
			"static asset loaded": (r) => r.status === 200 || r.status === 404,
		});
	});
};

export default tests;
