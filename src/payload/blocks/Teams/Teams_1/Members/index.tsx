import type { Teams_1_Members_Block } from "~/payload-types";

export default function Team_1_Members({ members }: Teams_1_Members_Block) {
	return (
		<div className="grid grid-cols-2 gap-4 border-t py-6 md:grid-cols-4">
			{members.map((member, index) => (
				<div key={index}>
					{/* <div className="bg-background size-20 rounded-full border p-0.5 shadow shadow-zinc-950/5"> */}
					{/* 	<img className="aspect-square rounded-full object-cover" src={member.avatar} alt={member.name} height="460" width="460" loading="lazy" /> */}
					{/* </div> */}
					<span className="mt-2 block text-sm">{member.name}</span>
					<span className="text-muted-foreground block text-xs">{member.role}</span>
				</div>
			))}
		</div>
	)
}
