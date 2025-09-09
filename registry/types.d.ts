/**
 * TypeScript interfaces for UIFoundry registry components
 * These types provide proper typing for all converted components
 */

export type PickRequired<T, Required extends keyof T> = Pick<T, Required> &
	Partial<Omit<T, Required>>;
