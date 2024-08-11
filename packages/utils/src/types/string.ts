export type LiteralString<T> = T extends string ? (string extends T ? never : T) : never;
