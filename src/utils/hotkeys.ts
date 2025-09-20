"use client";

import { useEffect, useState } from "react";

interface Hotkey {
	key: string;
	action: (e?: KeyboardEvent) => void;
}

export function useHotKeys() {
	const [hotkeys, setHotkeys] = useState<Hotkey[]>([]);

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			const hotkey = hotkeys.find((h) => h.key === e.key);
			if (!hotkey) return;
			if (hotkey && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				hotkey.action(e);
			}
		};
		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function addHotkey(hotkey: Hotkey) {
		setHotkeys((prev) => [...prev, hotkey]);
	}

	return {
		addHotkey,
	};
}
