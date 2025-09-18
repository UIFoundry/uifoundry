import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ok } from "~/server/dal";

// Mocked DB
interface Post {
	id: number;
	name: string;
}
const posts: Post[] = [
	{
		id: 1,
		name: "Hello World",
	},
];

export const postRouter = createTRPCRouter({
	hello: publicProcedure
		.input(z.object({ text: z.string() }))
		.query(({ input }) => {
			return ok({
				greeting: `Hello ${input.text}`,
			});
		}),

	create: publicProcedure
		.input(z.object({ name: z.string().min(1) }))
		.mutation(async ({ input }) => {
			const post: Post = {
				id: posts.length + 1,
				name: input.name,
			};
			posts.push(post);
			return ok(post);
		}),

	getLatest: publicProcedure.query(() => {
		return ok(posts.at(-1) ?? null);
	}),
});
