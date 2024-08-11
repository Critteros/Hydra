import { expectTypeOf, describe, test, expect } from 'vitest';

import { makeErrorCls } from '../errors';

describe('Errors utilities - type tests', () => {
  describe('makeErrorCls', () => {
    test('creates a subtype of Error class', () => {
      const CustomError = makeErrorCls('CustomError');
      const instance = new CustomError();

      expectTypeOf(instance).toEqualTypeOf<Error>();
    });
  });
});
