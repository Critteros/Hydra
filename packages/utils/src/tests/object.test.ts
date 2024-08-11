import { describe, test, expect } from 'vitest';

import {
  invert,
  isArray,
  isNumber,
  isObject,
  isPrimitive,
  isPrimitiveOrWrapper,
  isPrimitiveWrapper,
  isString,
  select,
  mergeObjectsWithPriority,
  mergeObjects,
} from '../object';

describe.concurrent('Object utilities', () => {
  describe.concurrent('invert', () => {
    test('inverts const object correctly', () => {
      const testObj = {
        a: 'b',
        c: 'd',
      } as const;

      expect(invert(testObj)).toStrictEqual({ b: 'a', d: 'c' });
    });

    test('inverts non cost object correctly', () => {
      const testObj = {
        a: 'b',
        c: 'd',
      };

      expect(invert(testObj)).toStrictEqual({ b: 'a', d: 'c' });
    });
  });

  test.concurrent.for`
    value                              | expected
    ${1}                               | ${true}
    ${'string'}                        | ${true}
    ${''}                              | ${true}
    ${true}                            | ${true}
    ${false}                           | ${true}
    ${Symbol('test')}                  | ${true}
    ${Symbol()}                        | ${true}
    ${null}                            | ${true}
    ${undefined}                       | ${true}
    ${BigInt(Number.MAX_SAFE_INTEGER)} | ${true}
    ${{}}                              | ${false}
    ${{ a: 3, b: 7 }}                  | ${false}
    ${new Error('test')}               | ${false}
    ${Boolean(true)}                   | ${true}
    ${Boolean()}                       | ${true}
    ${new Boolean(true)}               | ${false}
    ${new Boolean()}                   | ${false}
    ${Number(123)}                     | ${true}
    ${Number()}                        | ${true}
    ${new Number(123)}                 | ${false}
    ${new Number()}                    | ${false}
    ${String(123)}                     | ${true}
    ${String()}                        | ${true}
    ${new String()}                    | ${false}
    ${new String('abc')}               | ${false}
  `('isPrimitive correctly recognizes $value as $expected', ({ value, expected }, { expect }) => {
    expect(isPrimitive(value)).toBe(expected);
  });

  test.concurrent.for`
    value                              | expected
    ${1}                               | ${false}
    ${'string'}                        | ${false}
    ${''}                              | ${false}
    ${true}                            | ${false}
    ${false}                           | ${false}
    ${Symbol('test')}                  | ${false}
    ${Symbol()}                        | ${false}
    ${null}                            | ${false}
    ${undefined}                       | ${false}
    ${BigInt(Number.MAX_SAFE_INTEGER)} | ${false}
    ${{}}                              | ${false}
    ${{ a: 3, b: 7 }}                  | ${false}
    ${new Error('test')}               | ${false}
    ${Boolean(true)}                   | ${false}
    ${Boolean()}                       | ${false}
    ${new Boolean(true)}               | ${true}
    ${new Boolean()}                   | ${true}
    ${Number(123)}                     | ${false}
    ${Number()}                        | ${false}
    ${new Number(123)}                 | ${true}
    ${new Number()}                    | ${true}
    ${String(123)}                     | ${false}
    ${String()}                        | ${false}
    ${new String()}                    | ${true}
    ${new String('abc')}               | ${true}
   `(
    'isPrimitiveWrapper correctly recognizes $value as $expected',
    ({ value, expected }, { expect }) => {
      expect(isPrimitiveWrapper(value)).toBe(expected);
    },
  );

  test.concurrent.for`
    value                              | expected
    ${1}                               | ${true}
    ${'string'}                        | ${true}
    ${''}                              | ${true}
    ${true}                            | ${true}
    ${false}                           | ${true}
    ${Symbol('test')}                  | ${true}
    ${Symbol()}                        | ${true}
    ${null}                            | ${true}
    ${undefined}                       | ${true}
    ${BigInt(Number.MAX_SAFE_INTEGER)} | ${true}
    ${{}}                              | ${false}
    ${{ a: 3, b: 7 }}                  | ${false}
    ${new Error('test')}               | ${false}
    ${Boolean(true)}                   | ${true}
    ${Boolean()}                       | ${true}
    ${new Boolean(true)}               | ${true}
    ${new Boolean()}                   | ${true}
    ${Number(123)}                     | ${true}
    ${Number()}                        | ${true}
    ${new Number(123)}                 | ${true}
    ${new Number()}                    | ${true}
    ${String(123)}                     | ${true}
    ${String()}                        | ${true}
    ${new String()}                    | ${true}
    ${new String('abc')}               | ${true}
  `(
    'isPrimitiveOrWrapper correctly recognizes $value as $expected',
    ({ value, expected }, { expect }) => {
      expect(isPrimitiveOrWrapper(value)).toBe(expected);
    },
  );

  test.concurrent.for`
    value                              | expected
    ${1}                               | ${false}
    ${'string'}                        | ${true}
    ${''}                              | ${true}
    ${true}                            | ${false}
    ${false}                           | ${false}
    ${Symbol('test')}                  | ${false}
    ${Symbol()}                        | ${false}
    ${null}                            | ${false}
    ${undefined}                       | ${false}
    ${BigInt(Number.MAX_SAFE_INTEGER)} | ${false}
    ${{}}                              | ${false}
    ${{ a: 3, b: 7 }}                  | ${false}
    ${new Error('test')}               | ${false}
    ${Boolean(true)}                   | ${false}
    ${Boolean()}                       | ${false}
    ${new Boolean(true)}               | ${false}
    ${new Boolean()}                   | ${false}
    ${Number(123)}                     | ${false}
    ${Number()}                        | ${false}
    ${new Number(123)}                 | ${false}
    ${new Number()}                    | ${false}
    ${String(123)}                     | ${true}
    ${String()}                        | ${true}
    ${new String()}                    | ${true}
    ${new String('abc')}               | ${true}
  `('isString correctly recognizes $toTest as $expected', ({ value, expected }, { expect }) => {
    expect(isString(value)).toBe(expected);
  });

  test.concurrent.for`
    value                              | expected
    ${1}                               | ${true}
    ${'string'}                        | ${false}
    ${''}                              | ${false}
    ${true}                            | ${false}
    ${false}                           | ${false}
    ${Symbol('test')}                  | ${false}
    ${Symbol()}                        | ${false}
    ${null}                            | ${false}
    ${undefined}                       | ${false}
    ${BigInt(Number.MAX_SAFE_INTEGER)} | ${false}
    ${{}}                              | ${false}
    ${{ a: 3, b: 7 }}                  | ${false}
    ${new Error('test')}               | ${false}
    ${Boolean(true)}                   | ${false}
    ${Boolean()}                       | ${false}
    ${new Boolean(true)}               | ${false}
    ${new Boolean()}                   | ${false}
    ${Number(123)}                     | ${true}
    ${Number()}                        | ${true}
    ${new Number(123)}                 | ${true}
    ${new Number()}                    | ${true}
    ${String(123)}                     | ${false}
    ${String()}                        | ${false}
    ${new String()}                    | ${false}
    ${new String('abc')}               | ${false}
  `('isNumber correctly recognizes $toTest as $expected', ({ value, expected }, { expect }) => {
    expect(isNumber(value)).toBe(expected);
  });

  test.concurrent.for`
    value           | expected
    ${null}         | ${false}
    ${undefined}    | ${false}
    ${1}            | ${false}
    ${{}}           | ${false}
    ${[]}           | ${true}
    ${[undefined]}  | ${true}
    ${[1, 2, 3, 4]} | ${true}
  `('isArray correctly recognizes $value as $expected', ({ value, expected }, { expect }) => {
    expect(isArray(value)).toBe(expected);
  });

  test.concurrent.for`
    value                              | expected
    ${1}                               | ${false}
    ${'string'}                        | ${false}
    ${''}                              | ${false}
    ${true}                            | ${false}
    ${false}                           | ${false}
    ${Symbol('test')}                  | ${false}
    ${Symbol()}                        | ${false}
    ${null}                            | ${false}
    ${undefined}                       | ${false}
    ${BigInt(Number.MAX_SAFE_INTEGER)} | ${false}
    ${{}}                              | ${true}
    ${{ a: 3, b: 7 }}                  | ${true}
    ${new Error('test')}               | ${true}
    ${Boolean(true)}                   | ${false}
    ${Boolean()}                       | ${false}
    ${new Boolean(true)}               | ${false}
    ${new Boolean()}                   | ${false}
    ${Number(123)}                     | ${false}
    ${Number()}                        | ${false}
    ${new Number(123)}                 | ${false}
    ${new Number()}                    | ${false}
    ${String(123)}                     | ${false}
    ${String()}                        | ${false}
    ${new String()}                    | ${false}
    ${new String('abc')}               | ${false}
  `('isObject correctly recognizes $value as $expected', ({ value, expected }, { expect }) => {
    expect(isObject(value)).toBe(expected);
  });

  test.concurrent.for`
      propertyPath    | expected
      ${'a'}          | ${1}
      ${'nested'}     | ${{ b: 2, c: [1, 2, 3] }}
      ${'nested.b'}   | ${2}
      ${'nested.c'}   | ${[1, 2, 3]}
      ${'nested.c.0'} | ${1}
      ${'nested.c.1'} | ${2}
      ${'nested.c.2'} | ${3}
      ${'b'}          | ${2}
    `(
    'selects $propertyPath from const objects that equals to $expected',
    ({ propertyPath, expected }, { expect }) => {
      const obj = {
        a: 1,
        nested: {
          b: 2,
          c: [1, 2, 3],
        },
        b: 2,
      };
      expect(select(obj, propertyPath)).toStrictEqual(expected);
    },
  );

  describe.concurrent('mergeObjectsWithPriority adn mergeObjects', () => {
    test('merges simple objects with no intersection', () => {
      const objects = [
        { a: 3, b: 4 },
        { c: 6, d: { a: 3 } },
      ];
      expect(mergeObjects(objects)).toStrictEqual({ a: 3, b: 4, c: 6, d: { a: 3 } });
    });

    test('overrides primitive fields', () => {
      const objects = [{ a: 3, b: 4 }, { b: { c: 30 } }];
      expect(mergeObjects(objects)).toStrictEqual({ a: 3, b: { c: 30 } });
    });

    test('allows for setting custom priority', () => {
      expect(
        mergeObjectsWithPriority([
          {
            priority: 10,
            objectData: { a: 70, c: [3, 4], d: { a: 4 } },
          },
          {
            priority: 0,
            objectData: { a: 0, b: 4, c: [1, 2], d: { a: 1, b: 7 } },
          },
        ]),
      ).toStrictEqual({ a: 70, b: 4, c: [1, 2, 3, 4], d: { a: 4, b: 7 } });
    });

    test('extends arrays when merging', () => {
      const objects = [
        { a: [1, 2], b: 4 },
        { a: [3, 4], c: 7 },
      ];
      expect(mergeObjects(objects)).toStrictEqual({ a: [1, 2, 3, 4], b: 4, c: 7 });
    });

    test('works recursively when merging objects', () => {
      const obj1 = {
        a: 3,
        b: 4,
        c: {
          d: {
            e: {
              f: [1, 2],
              d: {
                e: '',
              },
              g: [],
            },
          },
        },
      };
      const obj2 = {
        b: 10,
        f: 8,
        c: {
          d: {
            e: {
              f: [3, 4],
              d: {
                e: [1, 2, 3, 4],
              },
              g: 'g',
            },
          },
        },
      };

      const expected = {
        b: 10,
        a: 3,
        f: 8,
        c: {
          d: {
            e: {
              f: [1, 2, 3, 4],
              d: {
                e: [1, 2, 3, 4],
              },
              g: 'g',
            },
          },
        },
      };

      expect(mergeObjects([obj1, obj2])).toStrictEqual(expected);
    });
  });
});
