import { describe, expect, test } from 'vitest';

import { ascending, descending } from '../compare';

describe.concurrent('Compare utilities', () => {
  describe.concurrent('sorting helper', () => {
    test('works with basic number array', () => {
      const arr = [5, 3, 7, 8, 1, 2];
      expect(arr.toSorted(ascending())).toStrictEqual([1, 2, 3, 5, 7, 8]);
      expect(arr.toSorted(descending())).toStrictEqual([8, 7, 5, 3, 2, 1]);
    });

    test('works with array of strings', () => {
      const arr = ['b', 'd', 'z', 'x', 'c', 'a'];
      expect(arr.toSorted(ascending())).toStrictEqual(['a', 'b', 'c', 'd', 'x', 'z']);
      expect(arr.toSorted(descending())).toStrictEqual(['z', 'x', 'd', 'c', 'b', 'a']);
    });

    test('works with the array of bigints', () => {
      const arr = [BigInt('10'), BigInt('7'), BigInt('1'), BigInt('2'), BigInt('100')];
      expect(arr.toSorted(ascending())).toStrictEqual([
        BigInt('1'),
        BigInt('2'),
        BigInt('7'),
        BigInt('10'),
        BigInt('100'),
      ]);
      expect(arr.toSorted(descending())).toStrictEqual([
        BigInt('100'),
        BigInt('10'),
        BigInt('7'),
        BigInt('2'),
        BigInt('1'),
      ]);
    });

    test('works with array of objects', () => {
      const arr = [
        {
          val: 3,
          x: 'v',
        },
        {
          val: 7,
          x: 'x',
        },
        {
          val: 1,
          x: '0',
        },
      ];
      expect(arr.toSorted(ascending('val'))).toStrictEqual([
        {
          val: 1,
          x: '0',
        },
        {
          val: 3,
          x: 'v',
        },
        {
          val: 7,
          x: 'x',
        },
      ]);
      expect(arr.toSorted(descending('val'))).toStrictEqual([
        {
          val: 7,
          x: 'x',
        },
        {
          val: 3,
          x: 'v',
        },
        {
          val: 1,
          x: '0',
        },
      ]);
    });

    test('key path has to be provided when sorting objects', () => {
      const arr = [
        {
          x: 3,
        },
        {
          x: 1,
        },
        {
          x: 100,
        },
      ];

      expect(() => arr.toSorted(ascending())).toThrowErrorMatchingInlineSnapshot(
        `[TypeError: Object path has to be provided when working with objects]`,
      );
      expect(() => arr.toSorted(descending())).toThrowErrorMatchingInlineSnapshot(
        `[TypeError: Object path has to be provided when working with objects]`,
      );
    });

    test.concurrent.for`
      testValue
      ${Symbol('test')}
      ${null}
      ${true}
      ${false}
    `('is not supported for $testValue', ({ testValue }, { expect }) => {
      const arr = [testValue, testValue] as unknown[];
      expect(() => arr.toSorted(ascending())).toThrowErrorMatchingSnapshot();
      expect(() => arr.toSorted(descending())).toThrowErrorMatchingSnapshot();
    });

    test('is stable sort', () => {
      const arr = [
        {
          x: BigInt('10'),
          val: 10,
        },
        {
          x: BigInt('10'),
          val: 1,
        },
        {
          x: BigInt('10'),
          val: 7,
        },
      ];
      expect(arr.toSorted(ascending('x'))).toStrictEqual([
        {
          x: BigInt('10'),
          val: 10,
        },
        {
          x: BigInt('10'),
          val: 1,
        },
        {
          x: BigInt('10'),
          val: 7,
        },
      ]);
      expect(arr.toSorted(descending('x'))).toStrictEqual([
        {
          x: BigInt('10'),
          val: 10,
        },
        {
          x: BigInt('10'),
          val: 1,
        },
        {
          x: BigInt('10'),
          val: 7,
        },
      ]);
    });
  });
});
