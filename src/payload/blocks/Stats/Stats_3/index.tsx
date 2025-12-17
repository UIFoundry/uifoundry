// Source: IntentUI - https://design.intentui.com/blocks (stats-03)
// Installed via: npx shadcn@latest add @irsyad/stats-03

"use client";

import { useEffect, useState } from "react";
import { Container } from "~/ui/container";
import { GridLines } from "~/ui/grid-lines";
import { AnimatedNumber } from "~/components/animated-number";
import type { Stats_3_Block } from "~/payload-types";

export default function Stats3(props: Stats_3_Block) {
	const [count, setCount] = useState(props.value || 0);

	useEffect(() => {
		if (!props.enableAnimation) return;

		const interval = setInterval(() => {
			setCount((prev) => prev + 1);
		}, props.animationInterval || 3000);

		return () => clearInterval(interval);
	}, [props.enableAnimation, props.animationInterval]);

	// Parse description to find and highlight the specified text
	const renderDescription = () => {
		if (!props.highlightedText || !props.description) {
			return <p className="mx-auto mt-4 max-w-md text-center text-lg/7 text-muted-fg">{props.description}</p>;
		}

		const parts = props.description.split(props.highlightedText);
		return (
			<p className="mx-auto mt-4 max-w-md text-center text-lg/7 text-muted-fg">
				{parts.map((part, index) => (
					<span key={index}>
						{part}
						{index < parts.length - 1 && (
							<strong className="font-semibold text-fg">{props.highlightedText}</strong>
						)}
					</span>
				))}
			</p>
		);
	};

	return (
		<div className="py-6 sm:py-16">
			<h2 className="sr-only">Our stats</h2>
			<div className="relative isolate border-muted-fg/30 border-y bg-muted py-16">
				{/* Gradient decorations - left side */}
				<div aria-hidden className="absolute inset-0 isolate hidden contain-strict lg:block">
					<div className="-translate-y-87.5 -rotate-45 absolute top-0 left-0 h-320 w-140 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
					<div className="-rotate-45 absolute top-0 left-0 h-320 w-60 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
					<div className="-translate-y-87.5 -rotate-45 absolute top-0 left-0 h-320 w-60 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
				</div>

				{/* Gradient decorations - right side */}
				<div aria-hidden className="absolute inset-0 isolate hidden contain-strict lg:block">
					<div className="-translate-y-87.5 absolute top-0 right-0 h-320 w-140 rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
					<div className="absolute top-0 right-0 h-320 w-60 rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:-5%_-50%]" />
					<div className="-translate-y-87.5 absolute top-0 right-0 h-320 w-60 rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
				</div>

				<GridLines width={2} height={2} mask="none" />
				<Container>
					<AnimatedNumber
						className="justify-center font-semibold tracking-tighter"
						value={count}
						fontSize={64}
					/>
					{renderDescription()}
				</Container>
			</div>
		</div>
	);
}
