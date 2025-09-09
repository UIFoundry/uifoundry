import type { RelationshipFieldClientProps } from "payload";
import { useField } from "@payloadcms/ui";

export default function ActiveThemeField(props: RelationshipFieldClientProps) {
	const { value } = useField<string>({ path: props.path });
	console.log("props: ", props);
	console.log("value: ", value);
	return <div>active theme admin component here</div>;
}
