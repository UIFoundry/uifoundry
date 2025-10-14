// @ts-ignore
import http from "k6/http";
import { sleep, check } from "k6";
import { SharedArray } from "k6/data";

export const options = {
	stages: [
		{ duration: "5s", target: 200 },
		{ duration: "30s", target: 200 },
		{ duration: "5s", target: 0 },
	],
	// thresholds: {
	// 	http_req_duration: ["p(99)<100"], // 99% of requests duration must be < 100ms
	// },
};

const tests = () => {
	const res = http.get("http://localhost:3005");
	check(res, { 200: (r) => r.status === 200 });
};

export default tests;
