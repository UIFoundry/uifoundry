"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "~/styles/utils";

export default function Features_6({
	header,
	subheader,
	tabs,
}: {
	header: string;
	subheader?: string;
	tabs?: { label?: string; title?: string; description?: string }[];
}) {
	const [active, setActive] = useState(0);
	const items = Array.isArray(tabs) ? tabs : [];
	const current = items[active];
	return (
		<section className="py-20 md:py-28">
			<div className="mx-auto max-w-6xl px-6">
				<div className="text-left">
					<h2 className="text-4xl font-semibold md:text-5xl">{header}</h2>
					<p className="text-muted-foreground mt-4 text-lg">{subheader}</p>
				</div>
				<div className="mt-8 flex flex-wrap gap-2">
					{items.map((t, i) => (
						<button
							key={i}
							onClick={() => setActive(i)}
							className={cn(
								"cursor-pointer rounded-full border px-3 py-1 text-xs",
								i === active
									? "bg-foreground text-background"
									: "bg-background hover:bg-muted/50",
							)}
						>
							{t.label}
						</button>
					))}
				</div>
				<motion.div
					initial={{ opacity: 0, y: 6 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.25 }}
					className="ring-border/50 bg-background/60 mt-5 rounded-2xl border p-6 ring-1 backdrop-blur"
				>
					<div className="text-lg font-medium">{current?.title}</div>
					{current?.description ? (
						<div className="text-muted-foreground mt-2 text-sm whitespace-pre-line">
							{current.description}
						</div>
					) : null}
				</motion.div>
			</div>
		</section>
	);
}
