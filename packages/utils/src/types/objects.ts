import type { O } from 'ts-toolbelt';
import type {
  Paths as TypeFestPaths,
  PartialDeep as TypeFestDeepPartial,
  EmptyObject as TypeFestEmptyObject,
} from 'type-fest';

// Type representing any plain TS object that is not array
export type AnyObject = Record<PropertyKey, unknown>;

// Type representing "{}", note: {} as a type allows any non nullish value including literals like `0` and `""`
export type EmptyObject = TypeFestEmptyObject;

// General object type that can be Inverted
export type InvertibleObject = Record<PropertyKey, PropertyKey>;

type KeyFromValue<Value, ObjectT extends InvertibleObject> = {
  [Key in keyof ObjectT]: Value extends ObjectT[Key] ? Key : never;
}[keyof ObjectT];

// Inverts the key ad values in a object
// credit: https://stackoverflow.com/a/57726844
export type Invert<ObjectT extends InvertibleObject> = {
  [Value in ObjectT[keyof ObjectT]]: KeyFromValue<Value, ObjectT>;
};

// credit: https://stackoverflow.com/a/58436959
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

type _Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  ...0[],
];

/**
 * Extract all leaf properties from object
 *
 * @warning Has bug with tuples which assumes that tuple have one more element than they actually contain
 */
export type Leaves<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
    ? { [K in keyof T]-?: Join<K, Leaves<T[K], _Prev[D]>> }[keyof T]
    : '';

/** Represent all primitive types */
export type Primitive = string | number | boolean | bigint | symbol | null | undefined;

/** Extract a type of value from a object using key path */
export type SelectIn<T, P extends TypeFestPaths<T>> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? // @ts-expect-error FIXME: Rest conflicts with string type
      SelectIn<T[K], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never;

/** Excludes keys from object O1 that are in O * */
export type ExcludeKeys<
  Target extends object,
  Source extends object,
  MatchType extends
    | 'default'
    | 'contains->'
    | 'extends->'
    | '<-contains'
    | '<-extends'
    | 'equals' = 'default',
> = O.Exclude<Target, Source, MatchType>;

export type { TypeFestPaths as Paths, TypeFestDeepPartial as DeepPartial };
