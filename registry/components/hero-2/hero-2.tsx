export default function Hero_2(props: ComponentProps) {
	return (
		<div className="grid h-[75vh] w-full grid-cols-2 bg-red-50 p-4">
			<div className="flex h-full flex-col items-start justify-center gap-2 bg-blue-200/30">
				<h1 className="clamp-[text,4xl,6xl]">{props.header}</h1>
				<p className="clamp-[text,md,xl]">{props.subheader}</p>
			</div>
			<div className="col-start-2 flex items-center justify-center">
				image goes here
			</div>
		</div>
	);
}