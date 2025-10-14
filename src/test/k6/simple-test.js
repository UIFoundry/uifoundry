// @ts-ignore
import http from "k6/http";

export const options = {
	vus: 1,
	duration: "10s",
};

const tests = () => {
	http.get("https://uifoundry.dev");
};

export default tests;
