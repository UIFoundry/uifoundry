export type PickRequired<T, Required extends keyof T> = Pick<T, Required> & Partial<Omit<T, Required>>
