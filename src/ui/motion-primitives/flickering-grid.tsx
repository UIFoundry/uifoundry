"use client";

import { useEffect, useRef } from "react";
import { cn } from "~/styles/utils";

interface FlickeringGridProps {
	className?: string;
	squareSize?: number;
	gridGap?: number;
	color?: string;
	maxOpacity?: number;
	flickerChance?: number;
	width?: number;
	height?: number;
}

export default function FlickeringGrid({
	className,
	squareSize = 4,
	gridGap = 6,
	color = "#60A5FA",
	maxOpacity = 0.5,
	flickerChance = 0.1,
	width = 800,
	height = 800,
}: FlickeringGridProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Set canvas size
		canvas.width = width;
		canvas.height = height;

		// Calculate grid dimensions
		const cellSize = squareSize + gridGap;
		const cols = Math.ceil(width / cellSize);
		const rows = Math.ceil(height / cellSize);

		// Create grid state
		const grid: number[][] = [];
		for (let i = 0; i < rows; i++) {
			grid[i] = [];
			for (let j = 0; j < cols; j++) {
				const row = grid[i];
				if (row) {
					row[j] = Math.random() * maxOpacity;
				}
			}
		}

		// Animation loop with frame throttling
		let animationFrameId: number;
		let lastFrameTime = 0;
		const frameDelay = 1000 / 5; // 20fps for slower animation

		const animate = (currentTime: number) => {
			animationFrameId = requestAnimationFrame(animate);

			// Throttle to ~20fps for slower, more subtle animation
			const deltaTime = currentTime - lastFrameTime;
			if (deltaTime < frameDelay) return;
			lastFrameTime = currentTime;

			ctx.clearRect(0, 0, width, height);

			// Draw grid
			for (let i = 0; i < rows; i++) {
				for (let j = 0; j < cols; j++) {
					const row = grid[i];
					if (!row) continue;

					const cell = row[j];
					if (cell === undefined) continue;

					// Randomly flicker cells (less frequently)
					if (Math.random() < flickerChance) {
						row[j] = Math.random() * maxOpacity;
					} else {
						// Gradually fade (slower fade)
						row[j] = cell * 0.95;
					}

					// Draw cell if visible
					const currentCell = row[j];
					if (currentCell !== undefined && currentCell > 0.01) {
						ctx.fillStyle = color;
						ctx.globalAlpha = currentCell;
						ctx.fillRect(j * cellSize, i * cellSize, squareSize, squareSize);
					}
				}
			}

			ctx.globalAlpha = 1;
		};

		animationFrameId = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, [squareSize, gridGap, color, maxOpacity, flickerChance, width, height]);

	return (
		<canvas ref={canvasRef} className={cn("pointer-events-none", className)} />
	);
}
