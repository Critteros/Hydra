import { remapErrors, makeCustomError, type BaseError } from '../errors';

const CustomError = makeCustomError('CustomError');

describe('remapErrors', () => {
  const baseError = new Error('base error');

  it('remaps to custom errors', () => {
    const betterError = new CustomError('Better error message');

    const remapper = remapErrors({
      if: Error,
      then: betterError,
    });

    expect(remapper(baseError)).toBe(betterError);
  });

  it('returns base error if its not in the mapping', () => {
    const CustomError2 = makeCustomError('CustomError2');

    const remapper = remapErrors({
      if: CustomError2,
      then: new CustomError('error'),
    });

    expect(remapper(baseError)).toBe(baseError);
  });

  it('adds error to error stack', () => {
    const betterError = new CustomError('error');

    const remapper = remapErrors({
      if: Error,
      then: betterError,
    });

    const err = remapper(baseError) as BaseError;

    expect(err.errorStack).toContain(baseError);
  });

  it('remaps with function', () => {
    const remapper = remapErrors({
      if: Error,
      then: () => new CustomError('error'),
    });

    expect(remapper(baseError)).toBeInstanceOf(CustomError);
  });
});
