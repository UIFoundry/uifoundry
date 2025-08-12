import type { Field } from "payload"

export type TextField = Extract<Field, { type: 'text' }>
export type ArrayField = Extract<Field, { type: 'array' }>
export type DateField = Extract<Field, { type: 'date' }>
export type SelectField = Extract<Field, { type: 'select' }>
export type CollapsibleField = Extract<Field, { type: 'collapsible' }>
export type UploadField = Extract<Field, { type: 'upload' }> 
