import type { Field } from "payload";

export type ArrayField = Extract<Field, { type: "array" }>;
export type CollapsibleField = Extract<Field, { type: "collapsible" }>;
export type DateField = Extract<Field, { type: "date" }>;
export type GroupField = Extract<Field, { type: "group" }>;
export type RelationshipField = Extract<Field, { type: "relationship" }>;
export type SelectField = Extract<Field, { type: "select" }>;

export type TextField = Extract<Field, { type: "text" }>;
export type UploadField = Extract<Field, { type: "upload" }>;
