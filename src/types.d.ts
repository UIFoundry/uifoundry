export type PickRequired<T, Required extends keyof T> = Partial<Omit<T, Required>> &
  Pick<T, Required>;
