declare type Nullable<T> = T | null;
export declare function toDate(dt?: Nullable<string | number>): Date;
export default function iftime(interval: string, dt?: Nullable<Date | string | number>): boolean;
export {};
