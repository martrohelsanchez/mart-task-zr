import { DefaultProperties } from '../types';

export type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
export type Override<T1, T2> = Omit<T1, keyof T2> & T2;
export type RequireField<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type OmitDefaultProperties<T> = Omit<T, keyof DefaultProperties>;
