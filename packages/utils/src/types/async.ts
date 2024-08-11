// Represents the possibility of a type to be wrapped in a Promise
export type MaybePromise<T> = T | Promise<T>;

// Unwraps the inner value from the Promise
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
