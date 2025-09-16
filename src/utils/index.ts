export function getInitials(name: string, limit = 1) {
	return name
		.split(" ")
		.map((name) => name.charAt(0).toUpperCase())
		.slice(0, limit)
		.join("");
}
