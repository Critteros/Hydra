import { describe, expectTypeOf, test } from 'vitest';

import {
  invert,
  isArray,
  isNumber,
  isPrimitive,
  isPrimitiveWrapper,
  isString,
  select,
} from '../object';
import type { AnyObject, Primitive } from '../types';

describe('Object utilities - type tests', () => {
  describe('invert', () => {
    test('inverts const object correctly', () => {
      const testObj = {
        a: 'b',
        c: 'd',
      } as const;

      expectTypeOf(testObj).toEqualTypeOf<{ readonly a: 'b'; readonly c: 'd' }>();
      expectTypeOf(invert(testObj)).toEqualTypeOf<{ b: 'a'; d: 'c' }>();
    });

    test('inverts non cost object correctly', () => {
      const testObj = {
        a: 'b',
        c: 'd',
      };

      expectTypeOf(testObj).toEqualTypeOf<{ a: string; c: string }>();
      expectTypeOf(invert(testObj)).toEqualTypeOf<{ [key: string]: 'a' | 'c' }>();
    });
  });

  describe('select', () => {
    test('correctly infers return type for const object', () => {
      const obj = {
        a: 1,
        nested: {
          b: 2,
          c: [1, 2, 3],
        },
        b: 2,
      } as const;

      expectTypeOf(select(obj, 'a')).toEqualTypeOf<1>();
      expectTypeOf(select(obj, 'nested')).toMatchTypeOf<{ b: 2; c: readonly [1, 2, 3] }>();
      expectTypeOf(select(obj, 'nested.b')).toEqualTypeOf<2>();
      expectTypeOf(select(obj, 'nested.c')).toEqualTypeOf<readonly [1, 2, 3]>();
      expectTypeOf(select(obj, 'nested.c.0')).toEqualTypeOf<1>();
      expectTypeOf(select(obj, 'nested.c.1')).toEqualTypeOf<2>();
      expectTypeOf(select(obj, 'nested.c.2')).toEqualTypeOf<3>();
      expectTypeOf(select(obj, 'b')).toEqualTypeOf<2>();
    });

    test('correctly infers return type for non-const object', () => {
      const obj = {
        a: 1,
        nested: {
          b: 2,
          c: [1, 2, 3],
        },
        b: 2,
      };

      expectTypeOf(select(obj, 'a')).toBeNumber();
      expectTypeOf(select(obj, 'nested')).toBeObject();
      expectTypeOf(select(obj, 'nested')).toEqualTypeOf<{ b: number; c: number[] }>();
      expectTypeOf(select(obj, 'nested.b')).toBeNumber();
      expectTypeOf(select(obj, 'nested.c')).toBeArray();
      expectTypeOf(select(obj, 'nested.c')).items.toBeNumber();
      expectTypeOf(select(obj, 'b')).toBeNumber();
    });

    test('correctly infers type of parameters', () => {
      const obj = {
        a: 1,
        nested: {
          b: 2,
          c: [1, 2, 3],
        },
        b: 2,
      } as const;

      expectTypeOf(select).parameter(0).toMatchTypeOf({});
      // @ts-expect-error FIXME: This should work, not sure why it doesn't
      expectTypeOf(select).parameter(0).toMatchTypeOf({ a: 3 });

      expectTypeOf(select).parameter(0).not.toMatchTypeOf('');
      expectTypeOf(select).parameter(0).not.toMatchTypeOf(1);
      expectTypeOf(select).parameter(0).not.toMatchTypeOf(Symbol());
    });
  });

  test('isPrimitive is a type guard', () => {
    expectTypeOf(isPrimitive).guards.toEqualTypeOf<Primitive>();
    expectTypeOf(isPrimitive).returns.toBeBoolean();
  });

  /* eslint-disable @typescript-eslint/no-wrapper-object-types */
  test('isPrimitiveWrapper is a type guard', () => {
    expectTypeOf(isPrimitiveWrapper).guards.toEqualTypeOf<Boolean | String | Number>();
    expectTypeOf(isPrimitiveWrapper).returns.toEqualTypeOf<boolean>();
  });

  test('isPrimitiveWrapper correctly narrows type', () => {
    const obj = new Boolean() as Boolean | AnyObject;
    expectTypeOf(obj).toEqualTypeOf<Boolean | AnyObject>();

    if (isPrimitiveWrapper(obj)) {
      expectTypeOf(obj).toEqualTypeOf<Boolean>();
    }
  });
  /* eslint-enable @typescript-eslint/no-wrapper-object-types */

  test('isString is a type guard', () => {
    expectTypeOf(isString).guards.toBeString();
    expectTypeOf(isString).returns.toBeBoolean();
  });

  test('isNumber is a type guard', () => {
    expectTypeOf(isNumber).guards.toBeNumber();
    expectTypeOf(isNumber).returns.toBeBoolean();
  });

  test('isArray type-guards an array', () => {
    expectTypeOf(isArray).guards.toBeArray();
    expectTypeOf(isArray).returns.toBeBoolean();
  });

  test('isArray correctly narrows down type', () => {
    type TestType = number[] | string;
    const el = [1, 2, 3] as TestType;
    expectTypeOf(el).toEqualTypeOf<number[] | string>();
    if (isArray(el)) {
      expectTypeOf(el).toEqualTypeOf<number[]>();
    }
  });
});
