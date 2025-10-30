"use client";

import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useState } from "react";

import { trpc } from "~/trpc/react";

export function LatestPost() {
	const queryClient = useQueryClient();
	const latestPost = useSuspenseQuery(trpc.post.getLatest.queryOptions());

	const [name, setName] = useState("");
	const createPost = useMutation(
		trpc.post.create.mutationOptions({
			onSuccess: async () => {
				await queryClient.invalidateQueries(trpc.post.pathFilter());
			},
		}),
	);

	return (
		<div className="w-full max-w-xs">
			{latestPost.isSuccess && latestPost.data.success ? (
				<p className="truncate">
					Your most recent post: {latestPost.data.data.name}
				</p>
			) : (
				<p>You have no posts yet.</p>
			)}
			<form
				className="flex flex-col gap-2"
				onSubmit={(e) => {
					e.preventDefault();
					createPost.mutate({ name });
				}}
			>
				<input
					className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
					onChange={(e) => setName(e.target.value)}
					placeholder="Title"
					type="text"
					value={name}
				/>
				<button
					className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
					disabled={createPost.isPending}
					type="submit"
				>
					{createPost.isPending ? "Submitting..." : "Submit"}
				</button>
			</form>
		</div>
	);
}
