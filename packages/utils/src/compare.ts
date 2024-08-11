import { isPrimitive, isNumber, isString, select } from '@/object';
import type { AnyObject, Leaves } from '@/types/objects';

function _shortenBigint(value: bigint): number {
  if (value < 0) {
    return -1;
  }
  if (value > 0) {
    return 1;
  }
  return 0;
}

type _CompareFn<T, R = number> = (first: T, second: T) => R;
function _makeCompareFunction(config: {
  compareNumbers: _CompareFn<number>;
  compareStrings: _CompareFn<string>;
  compareBigInts: _CompareFn<bigint, bigint>;
}) {
  const { compareBigInts, compareStrings, compareNumbers } = config;
  const func = <Item>(objPath?: Item extends AnyObject ? Leaves<Item> : string) => {
    return (first: Item, second: Item): number => {
      if (first == null || typeof first === 'symbol') {
        const objType = typeof first;
        throw new TypeError(
          `Comparison is not supported between objects of ${objType === 'object' ? 'null' : objType}`,
        );
      }

      if (isNumber(first)) {
        return compareNumbers(first, second as number);
      }

      if (isString(first)) {
        return compareStrings(first, second as string);
      }

      if (typeof first === 'bigint') {
        const value = compareBigInts(first, second as bigint);
        return _shortenBigint(value);
      }

      if (typeof first === 'object') {
        if (objPath === undefined) {
          throw new TypeError('Object path has to be provided when working with objects');
        }

        return func()(
          // Type inference would not work here nicely with this amount of generics
          select(first as AnyObject, objPath as never),
          select(second as AnyObject, objPath as never),
        );
      }

      throw new TypeError(`Sorting not supported for ${typeof first}`);
    };
  };

  return func;
}

/**
 * Helper function to sort items in ascending order
 *
 * Works with:
 *
 * - Numbers
 * - Bigints
 * - Strings
 * - Objects (if `objPath` is supped for one of the above types)
 *
 * @example
 *   // returns [1, 2, 3, 5, 7, 8]
 *   [5, 3, 7, 8, 1, 2].toSorted(ascending());
 *
 *   // returns ['a', 'b', 'c', 'd', 'x', 'z']
 *   ['b', 'd', 'z', 'x', 'c', 'a'].toSorted(ascending());
 *
 *   // returns [{ key: 1 }, { key: 2 }]
 *   [{ key: 2 }, { key: 1 }].toSorted(ascending('key'));
 *
 * @param objPath - Object path to retrieve key for compare
 * @throws {TypeError} If used with types that does not support sorting like symbol
 * @throws {TypeError} If used with object without providing the `objPath` parameter
 */
export const ascending = _makeCompareFunction({
  compareNumbers: (first, second) => first - second,
  compareStrings: (first, second) => first.localeCompare(second),
  compareBigInts: (first, second) => first - second,
});

/**
 * Helper function to sort items in descending order
 *
 * Works with:
 *
 * - Numbers
 * - Bigints
 * - Strings
 * - Objects (if `objPath` is supped for one of the above types)
 *
 * @example
 *   // returns [8, 7, 5, 3, 2, 1]
 *   [5, 3, 7, 8, 1, 2].toSorted(ascending());
 *
 *   // returns ['z', 'x', 'd', 'c', 'b', 'a']
 *   ['b', 'd', 'z', 'x', 'c', 'a'].toSorted(ascending());
 *
 *   // returns [{ key: 2 }, { key: 1 }]
 *   [{ key: 1 }, { key: 2 }].toSorted(ascending('key'));
 *
 * @param objPath - Object path to retrieve key for compare
 * @throws {TypeError} If used with types that does not support sorting like symbol
 * @throws {TypeError} If used with object without providing the `objPath` parameter
 */
export const descending = _makeCompareFunction({
  compareNumbers: (first, second) => second - first,
  compareStrings: (first, second) => second.localeCompare(first),
  compareBigInts: (first, second) => second - first,
});
