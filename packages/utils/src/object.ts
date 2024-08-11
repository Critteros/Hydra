import { ascending } from '@/compare';
import type {
  InvertibleObject,
  Invert,
  AnyObject,
  SelectIn,
  Paths,
  Primitive,
  DeepPartial,
} from '@/types/objects';

/**
 * Inverts key-values of the provided object
 *
 * @example
 *   // returns { b: 'a', c: 'd' }
 *   invert({
 *     a: 'b',
 *     c: 'd',
 *   });
 *
 * @param object
 */
export function invert<const ObjectT extends InvertibleObject>(object: ObjectT): Invert<ObjectT> {
  const objectEntries = Object.entries(object);
  const invertedEntries = objectEntries.map(([key, value]) => [value, key]);
  const invertedObject = Object.fromEntries(invertedEntries) as Invert<ObjectT>;
  return invertedObject;
}

/**
 * Type guard if the passed element is of a primitive type or object type
 *
 * Credit: https://stackoverflow.com/a/17772086
 *
 * @example
 *   // returns true
 *   isPrimitive(null);
 *   isPrimitive(undefined);
 *   isPrimitive(1);
 *   isPrimitive('string');
 *   isPrimitive(true);
 *   isPrimitive(Symbol());
 *   isPrimitive(BigInt(Number.MAX_SAFE_INTEGER));
 *   isPrimitive(String('object wrapper'));
 *   isPrimitive(Number(10));
 *   isPrimitive(Boolean(true));
 *
 * @example
 *   // returns false
 *   isPrimitive({});
 *   isPrimitive({ a: 3 });
 *   isPrimitive(new String('object wrapper'));
 *   isPrimitive(new Number(10));
 *   isPrimitive(new Boolean(true));
 *
 * @param x
 */
export function isPrimitive(x: unknown): x is Primitive {
  return x !== Object(x);
}

/* eslint-disable @typescript-eslint/no-wrapper-object-types */

/**
 * Type guard if passes element is primitive or wrapper type
 *
 * @example
 *   // returns true
 *   isPrimitive(null);
 *   isPrimitive(undefined);
 *   isPrimitive(1);
 *   isPrimitive('string');
 *   isPrimitive(true);
 *   isPrimitive(Symbol());
 *   isPrimitive(BigInt(Number.MAX_SAFE_INTEGER));
 *   isPrimitive(String('object wrapper'));
 *   isPrimitive(Number(10));
 *   isPrimitive(Boolean(true));
 *   isPrimitive(new String('object wrapper'));
 *   isPrimitive(new Number(10));
 *   isPrimitive(new Boolean(true));
 *
 * @example
 *   // returns false
 *   isPrimitive({});
 *   isPrimitive({ a: 3 });
 *
 * @param x
 */
export function isPrimitiveOrWrapper(x: unknown): x is Primitive | Number | Boolean | String {
  return x !== Object(x) || isPrimitiveWrapper(x);
}

/**
 * Type guard if the passed element is a primitive wrapper type
 *
 * @example
 *   // returns true
 *   isPrimitiveWrapper(new Number(123));
 *   isPrimitiveWrapper(new String(''));
 *   isPrimitiveWrapper(new Boolean(false));
 *
 * @example
 *   // return false
 *   isPrimitiveWrapper(Number(123));
 *   isPrimitiveWrapper(String(''));
 *   isPrimitiveWrapper(Boolean(false));
 *   isPrimitiveWrapper(true);
 *   isPrimitiveWrapper('');
 *   isPrimitiveWrapper(123);
 *
 * @param x
 */
export function isPrimitiveWrapper(x: unknown): x is Boolean | String | Number {
  return x instanceof Number || x instanceof String || x instanceof Boolean;
}

/* eslint-enable @typescript-eslint/no-wrapper-object-types */

/**
 * Type guard if the passed element is of a string type
 *
 * Credit: https://stackoverflow.com/a/17772086
 *
 * @example
 *   // returns true
 *   isString('123');
 *   isString(new String('object wrapper'));
 *   isString(String('object wrapper'));
 *
 * @example
 *   // returns false
 *   isString(null);
 *   isString(false);
 *
 * @param x
 */
export function isString(x: unknown): x is string {
  return Object.prototype.toString.call(x) === '[object String]';
}

/**
 * Type guard if the passed element is of a number type
 *
 * @example
 *   // returns true
 *   isNumber(2);
 *   isNumber(new Number(3));
 *   iseNumber(Number(4));
 *
 * @example
 *   // returns false
 *   isNumber('string');
 *   isNumber(null);
 *
 * @param x
 */
export function isNumber(x: unknown): x is number {
  return Object.prototype.toString.call(x) === '[object Number]';
}

/**
 * Type guard if the passed element is an Array
 *
 * @example
 *   // returns true
 *   isArray([])
 *   isArray([1,2,3]
 *
 * @example
 *   // returns false
 *   isArray({});
 *   isArray(null);
 *
 * @param x
 */
export function isArray(x: unknown): x is typeof x extends Array<infer Item> ? Item[] : unknown[] {
  return Array.isArray(x);
}

export function isObject(
  x: unknown,
): x is typeof x extends Record<infer Keys, infer Values>
  ? Record<Keys, Values>
  : Record<PropertyKey, unknown> {
  return typeof x === 'object' && !isArray(x) && !isPrimitiveOrWrapper(x);
}

/**
 * Selects deeply nested property from object using property path
 *
 * @example
 *   // returns 3
 *   select({ a: { nestedA: 3 }, b: 7 }, 'a.nestedA');
 *
 * @example
 *   // returns 3
 *   select({ arr: [2, 3] }, 'arr.1');
 *
 * @param obj
 * @param path
 * @param options
 */
export function select<ObjectT extends AnyObject, Path extends Paths<ObjectT>>(
  obj: ObjectT,
  path: Path,
  options?: { separator: string },
): SelectIn<ObjectT, Path> {
  const { separator = '.' } = options ?? {};

  const parts = (path as string).split(separator);
  let currentValue: unknown = obj;

  for (const part of parts) {
    // @ts-expect-error Indexing an unknown value
    currentValue = currentValue[part];
  }

  return currentValue as SelectIn<ObjectT, Path>;
}

/**
 * Merges objects according to the provided priority
 *
 * Providing:
 *
 * - Primitive value -> causes previous value to be overridden
 * - Array to an array -> extends the original array
 * - Object to an object -> recursively merges provided object with previous value
 * - Object or array to a primitive -> overrides value
 *
 * @example
 *   // returns { a: 70, b: 4, c: [1, 2, 3, 4], d: { a: 4, b: 7 } }
 *   mergeObjectsWithPriority([
 *     {
 *       priority: 10,
 *       objectData: { a: 70, c: [3, 4], d: { a: 4 } },
 *     },
 *     {
 *       priority: 0,
 *       objectData: { a: 0, b: 4, c: [1, 2], d: { a: 1, b: 7 } },
 *     },
 *   ]);
 *
 * @param items
 */
export function mergeObjectsWithPriority<ObjectT extends AnyObject, OutputT = ObjectT>(
  items: Array<{ priority: number; objectData: DeepPartial<ObjectT> }>,
): OutputT {
  const sortedItems = items.toSorted(ascending('priority'));

  const __writeUnsafe = (obj: AnyObject, key: string, value: unknown) => {
    obj[key] = value;
  };

  // A simple spread (...) would override nested properties, instead a recursive spread is required
  return sortedItems.reduce((acc, { objectData }) => {
    const obj = { ...acc };
    const accKeys = Object.keys(acc);

    const mergeEntries = Object.entries(objectData);

    for (const [key, value] of mergeEntries) {
      // If the accumulator does not have this key the add it
      if (!accKeys.includes(key)) {
        __writeUnsafe(obj, key, value);
        continue;
      }

      const _key = key as keyof typeof obj;
      const accVal = obj[_key] as unknown;

      // If writing array and previous value was an array extend it
      if (isArray(value) && isArray(accVal)) {
        const newArray = [...accVal, ...value];
        __writeUnsafe(obj, key, newArray);
        continue;
      }

      // If writing object to an object, merge tem recursively
      if (isObject(value) && isObject(accVal)) {
        const result = mergeObjectsWithPriority([
          {
            priority: 0,
            objectData: accVal,
          },
          { priority: 1, objectData: value },
        ]);
        __writeUnsafe(obj, key, result);
        continue;
      }

      // In other cases just override the previous value
      __writeUnsafe(obj, key, value);
    }

    return obj;
  }, {}) as OutputT;
}

/**
 * Merges provided object from left to right
 *
 * Providing:
 *
 * - Primitive value -> causes previous value to be overridden
 * - Array to an array -> extends the original array
 * - Object to an object -> recursively merges provided object with previous value
 * - Object or array to a primitive -> overrides value
 *
 * @example
 *   // returns { a: 70, b: 4, c: [1, 2, 3, 4], d: { a: 4, b: 7 } }
 *   mergeObjectsWithPriority([
 *     { a: 0, b: 4, c: [1, 2], d: { a: 1, b: 7 } },
 *     { a: 70, c: [3, 4], d: { a: 4 } },
 *   ]);
 *
 * @param objects
 */
export function mergeObjects<ObjectT extends AnyObject, OutputT = ObjectT>(
  objects: Array<DeepPartial<ObjectT>>,
): OutputT {
  return mergeObjectsWithPriority<ObjectT, OutputT>(
    objects.map((data, index) => ({
      objectData: data,
      priority: index,
    })),
  );
}
