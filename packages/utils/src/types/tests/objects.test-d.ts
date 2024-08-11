import { expectTypeOf, describe, test } from 'vitest';

import type {
  AnyObject,
  EmptyObject,
  Invert,
  Leaves,
  Paths,
  SelectIn,
  Primitive,
} from '../objects';

describe('object type utilities', () => {
  test('EmptyObject usage', () => {
    expectTypeOf<EmptyObject>().toBeObject();
    // Not sure why toEqualTypeOf will not work, EmptyObject is supposed to be exactly equal to {}
    expectTypeOf({}).toMatchTypeOf<EmptyObject>();
    expectTypeOf<{ a: number }>().not.toMatchTypeOf<EmptyObject>();
  });

  test('AnyObject usage', () => {
    expectTypeOf({}).toMatchTypeOf<EmptyObject>();
    expectTypeOf([]).not.toMatchTypeOf<EmptyObject>();
    expectTypeOf(new Set()).not.toMatchTypeOf<EmptyObject>();
  });

  test('Invert with const object', () => {
    const obj = { a: 'b', c: 'd' } as const;
    expectTypeOf<Invert<typeof obj>>().toEqualTypeOf<{ b: 'a'; d: 'c' }>();
  });

  test('Invert with non const object', () => {
    const obj = { a: 'b', c: 'd' };
    type t = Invert<typeof obj>;
    expectTypeOf<Invert<typeof obj>>().toEqualTypeOf<Record<string, 'a' | 'c'>>();
  });

  test('Paths for non const object', () => {
    const obj = {
      a: 1,
      nested: {
        b: 2,
        c: [1, 2, 3],
      },
      b: 2,
    };

    expectTypeOf<Paths<typeof obj>>().toEqualTypeOf<
      'a' | 'nested.b' | 'b' | 'nested' | 'nested.c' | `nested.c.${number}`
    >();
  });

  test('Paths for const object', () => {
    const obj = {
      a: 1,
      nested: {
        b: 2,
        c: [1, 2, 3],
      },
      b: 2,
    } as const;

    expectTypeOf<Paths<typeof obj>>().toEqualTypeOf<
      'a' | 'nested.b' | 'b' | 'nested' | 'nested.c' | 'nested.c.0' | 'nested.c.1' | 'nested.c.2'
    >();
  });

  test('Leaves for const object', () => {
    const obj = {
      a: 1,
      nested: {
        b: 2,
        c: [1, 2, 3],
      },
      b: 2,
    } as const;

    // const t: Leaves<typeof obj> = ''

    expectTypeOf<Leaves<typeof obj>>().toEqualTypeOf<
      // FIXME: Same here as is test above, the `nested.c.3` should not be there
      'a' | 'nested.b' | 'b' | 'nested.c.0' | 'nested.c.1' | 'nested.c.2' | 'nested.c.3'
    >();
  });

  test('Leaves for non const object', () => {
    const obj = {
      a: 1,
      nested: {
        b: 2,
        c: [1, 2, 3],
      },
      b: 2,
    };

    expectTypeOf<Leaves<typeof obj>>().toEqualTypeOf<
      'a' | 'nested.b' | `nested.c.${number}` | 'b'
    >();
  });

  test('SelectIn for const object', () => {
    const obj = {
      a: 1,
      nested: {
        b: 2,
        c: [1, 2, 3],
      },
      b: 2,
    } as const;
    type ObjType = typeof obj;

    expectTypeOf<SelectIn<ObjType, 'a'>>().toBeNumber();
    expectTypeOf<SelectIn<ObjType, 'a'>>().toEqualTypeOf<1>();

    expectTypeOf<SelectIn<ObjType, 'nested'>>().toBeObject();
    expectTypeOf<SelectIn<ObjType, 'nested'>>().toMatchTypeOf<{ b: 2; c: readonly [1, 2, 3] }>();
    expectTypeOf<SelectIn<ObjType, 'nested.b'>>().toBeNumber();
    expectTypeOf<SelectIn<ObjType, 'nested.b'>>().toEqualTypeOf<2>();
    expectTypeOf<SelectIn<ObjType, 'nested.c'>>().toEqualTypeOf<readonly [1, 2, 3]>();
    expectTypeOf<SelectIn<ObjType, 'nested.c.0'>>().toBeNumber();
    expectTypeOf<SelectIn<ObjType, 'nested.c.0'>>().toEqualTypeOf<1>();
    expectTypeOf<SelectIn<ObjType, 'nested.c.1'>>().toBeNumber();
    expectTypeOf<SelectIn<ObjType, 'nested.c.1'>>().toEqualTypeOf<2>();
    expectTypeOf<SelectIn<ObjType, 'nested.c.2'>>().toBeNumber();
    expectTypeOf<SelectIn<ObjType, 'nested.c.2'>>().toEqualTypeOf<3>();

    expectTypeOf<SelectIn<ObjType, 'b'>>().toBeNumber();
    expectTypeOf<SelectIn<ObjType, 'b'>>().toEqualTypeOf<2>();
  });

  test('SelectIn for non-const object', () => {
    const obj = {
      a: 1,
      nested: {
        b: 2,
        c: [1, 2, 3],
      },
      b: 2,
    };
    type ObjType = typeof obj;

    expectTypeOf<SelectIn<ObjType, 'a'>>().toBeNumber();

    expectTypeOf<SelectIn<ObjType, 'nested'>>().toBeObject();
    expectTypeOf<SelectIn<ObjType, 'nested'>>().toEqualTypeOf<{ b: number; c: number[] }>();
    expectTypeOf<SelectIn<ObjType, 'nested.b'>>().toBeNumber();
    expectTypeOf<SelectIn<ObjType, 'nested.c'>>().toBeArray();
    expectTypeOf<SelectIn<ObjType, 'nested.c'>>().items.toBeNumber();

    expectTypeOf<SelectIn<ObjType, 'b'>>().toBeNumber();
  });

  test('Primitive: Tests for positive cases', () => {
    expectTypeOf(1).toMatchTypeOf<Primitive>();
    expectTypeOf('value').toMatchTypeOf<Primitive>();
    expectTypeOf(Symbol()).toMatchTypeOf<Primitive>();
    expectTypeOf(Symbol('symbol')).toMatchTypeOf<Primitive>();
    expectTypeOf(BigInt(Number.MAX_SAFE_INTEGER)).toMatchTypeOf<Primitive>();
    expectTypeOf(null).toMatchTypeOf<Primitive>();
    expectTypeOf(undefined).toMatchTypeOf<Primitive>();
    expectTypeOf(String('')).toMatchTypeOf<Primitive>();
    expectTypeOf(Number(10)).toMatchTypeOf<Primitive>();
  });

  test('Primitive: Tests for negative cases', () => {
    expectTypeOf({}).not.toMatchTypeOf<Primitive>();
    expectTypeOf({ a: 3 }).not.toMatchTypeOf<Primitive>();
    expectTypeOf(new String('')).not.toMatchTypeOf<Primitive>();
    expectTypeOf(new Number(10)).not.toMatchTypeOf<Primitive>();
  });
});
