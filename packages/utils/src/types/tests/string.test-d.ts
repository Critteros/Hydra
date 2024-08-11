import { expectTypeOf, describe, test } from 'vitest';

import type { LiteralString } from '../string';

describe('string type utilities', () => {
  test('LiteralString', () => {
    const testFunc = <T>(a: LiteralString<T>) => a;
    const constString = 'test string';

    expectTypeOf(testFunc(constString)).toEqualTypeOf<'test string'>();
    // @ts-expect-error Not callable with plain string type
    expectTypeOf(testFunc).toBeCallableWith('string');
  });
});
