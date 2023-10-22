import { remapErrors, makeCustomError, type BaseError, MapErrors } from '../errors';

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
});

describe('MapErrors', () => {
  class Test {
    @MapErrors({
      if: Error,
      then: new CustomError('error'),
    })
    public method(): void {
      expect(this instanceof Test).toBe(true);
      throw new Error('error');
    }

    @MapErrors({
      if: CustomError,
      then: new CustomError('error'),
    })
    public notValidMapping(): void {
      expect(this instanceof Test).toBe(true);
      throw new Error('error');
    }
  }

  it('remaps errors', () => {
    const test = new Test();
    expect(() => test.method()).toThrowError(CustomError);
  });

  it('does not remap errors if not valid mapping', () => {
    const test = new Test();
    expect(() => test.notValidMapping()).toThrowError(Error);
  });
});
