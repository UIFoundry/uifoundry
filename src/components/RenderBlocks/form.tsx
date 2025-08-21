// import type {
// 	FormSectionBlock,
// 	User as PayloadUser,
// 	FormArraySectionPageBlock,
// } from "~/payload-types";
// import React, { type ComponentPropsWithRef, type ElementType } from "react";
// import type { FieldArrayApi, FormApi } from "@rvf/react";
// import { type Block } from "payload";
// import { getSubmitKeyLeaf } from "~/payload/utils";
// import { useFormState } from "../DynamicReportForm/Wrapper";
//
// type Params = Promise<{ slug: string }>;
// type PageParams = Partial<Awaited<Params>>;
// type SearchParams = Promise<Record<string, string | string[] | undefined>>;
// type PageSearchParams = Partial<Awaited<SearchParams>>;
//
// export type FormPageBlock = ArrayElement<FormSectionBlock["pages"]>;
// export type FormPageInputBlocks = FormPageBlock["inputs"];
// export type FormInputBlocks =
// 	| Block[]
// 	| FormPageBlock[]
// 	| FormPageBlock["inputs"]
//
// 	| FormArraySectionPageBlock["inputs"];
//
// export interface RenderBlocksContext extends ComponentPropsWithRef<"div"> {
// 	blockComponents: Record<string, ElementType>;
// 	user?: PayloadUser | null;
// 	params?: PageParams;
// 	searchParams?: PageSearchParams;
// }
//
// const RenderBlocks: React.FC<
// 	{
// 		blocks: FormInputBlocks;
// 		// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 		useForm?: FormApi<any>;
// 		// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 		useFieldArray?: FieldArrayApi<any>;
// 		trimSubmitKeys?: boolean;
// 		parentSubmitKey?: string;
// 	} & RenderBlocksContext
// > = (props) => {
// 	const {
// 		blocks,
// 		blockComponents,
// 		params,
// 		searchParams,
// 		useFieldArray,
// 		user,
// 		parentSubmitKey,
// 		...divProps
// 	} = props;
// 	const { form } = useFormState();
//
// 	const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;
//
// 	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
// 	if (blocks.length && hasBlocks) {
// 		return (
// 			blocks
// 				// @ts-expect-error hidden field applies to all form input blocks
// 				.filter((b) => !Boolean(b?.hidden))
// 				.map((block, index) => {
// 					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// 					// @ts-expect-error
// 					const { blockName, blockType, key: blockKey, submitKey } = block;
//
// 					if (blockType && blockType in blockComponents) {
// 						// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
// 						const Block = blockComponents[blockType];
//
// 						let fieldSubmitKey = submitKey;
// 						if (parentSubmitKey) {
// 							fieldSubmitKey = "";
// 							for (const key of parentSubmitKey) {
// 								fieldSubmitKey += key;
// 							}
// 							fieldSubmitKey = `${parentSubmitKey}${getSubmitKeyLeaf(submitKey as string)}`;
// 						}
//
// 						if (Block) {
// 							return (
// 								//<div className="w-full" key={index}>
// 								<Block
// 									id={blockName}
// 									params={params}
// 									searchParams={searchParams}
// 									user={user}
// 									useFieldArray={useFieldArray}
// 									useField={
// 										parentSubmitKey
// 											?
// 											form.field(fieldSubmitKey)
// 											: undefined
// 									}
// 									fieldSubmitKey={fieldSubmitKey}
// 									key={blockKey ?? index}
// 									block={block}
// 									index={index}
// 									{...block}
// 									{...divProps}
// 								/>
// 								//</div>
// 							);
// 						}
// 					}
// 					return null;
// 				})
// 		);
// 	}
//
// 	return null;
// };
//
// export default RenderBlocks;
