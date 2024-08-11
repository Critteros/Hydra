import { expectTypeOf, describe, test } from 'vitest';

import type { MaybePromise, UnwrapPromise } from '../async';

describe('async type utilities', () => {
  test('MaybePromise', () => {
    expectTypeOf<MaybePromise<number>>().toEqualTypeOf<number | Promise<number>>();
  });

  test('UnwrapPromise', () => {
    expectTypeOf<UnwrapPromise<Promise<number>>>().toEqualTypeOf<number>();
  });
});
