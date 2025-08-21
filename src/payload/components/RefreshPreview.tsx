"use client";

import { RotateCcw } from "lucide-react";

export default function RefreshPreview() {
	function handleClick() {
		const timestamp = Date.now();
		localStorage.setItem("uifoundry-refresh", timestamp.toString());
	}

	return (
		<RotateCcw
			type="button"
			aria-label="Refresh Live Preview"
			aria-description="Refresh Live Preview"
			className="cursor-pointer transition-colors duration-300 hover:stroke-neutral-500"
			onClick={handleClick}
		/>
	);
}
