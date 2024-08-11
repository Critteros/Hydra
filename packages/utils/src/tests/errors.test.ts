import { describe, test, expect } from 'vitest';

import { makeErrorCls } from '../errors';

describe.concurrent('Errors utilities', () => {
  describe.concurrent('makeErrorCls', () => {
    test('by default creates class that inherits from Error class', () => {
      const CustomError = makeErrorCls('CustomError');
      const instance = new CustomError();

      expect(instance).toBeInstanceOf(Error);
      expect(instance).toBeInstanceOf(CustomError);
    });

    test('properly sets name of the class', () => {
      const CustomError = makeErrorCls('CustomError');
      const instance = new CustomError();

      expect(instance.name).toBe('CustomError');
    });

    test.concurrent.for`
      message            | expected
      ${''}              | ${''}
      ${undefined}       | ${''}
      ${'error message'} | ${'error message'}
    `(
      'provides error message $expected when passed $message',
      ({ message, expected }, { expect }) => {
        const CustomError = makeErrorCls('CustomError');
        const instance = new CustomError(message as string);
        expect(instance.message).toStrictEqual(expected);
      },
    );
  });
});
