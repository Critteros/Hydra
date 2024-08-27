import { describe, expect, test, vi, expectTypeOf } from 'vitest';

import { r_ } from '../async';

describe('intoResult typings', () => {
  test('correctly discriminates union', async () => {
    const [result, error] = await r_(Promise.resolve(3));

    if (!error) {
      expectTypeOf(result).toEqualTypeOf<number>();
    }
    if (result === undefined) {
      expectTypeOf(error).toMatchTypeOf<Error>();
    }
  });
});
