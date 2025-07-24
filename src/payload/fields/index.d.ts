import type { Field } from "payload"

export type DateField = Extract<Field, { type: 'date' }>
export type SelectField = Extract<Field, { type: 'select' }> 
