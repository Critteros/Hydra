/**
 * Utility to create custom error subclasses
 *
 * @example
 *   const CustomError = makeErrorCls('CustomError');
 *   throw new CustomError('Error message');
 *
 * @example
 *   const CustomTypeError = makeErrorCls('CustomError', TypeError);
 *   throw new CustomError('Error message');
 *
 * @param errorClassName Name of the error class
 * @param baseErrorCls Base error class to use
 */
export function makeErrorCls(errorClassName: string, baseErrorCls: ErrorConstructor = Error) {
  const definition = class extends baseErrorCls {
    constructor(message?: string) {
      super(message);
      this.name = errorClassName;
    }
  };
  Object.defineProperty(definition, 'name', { value: errorClassName });
  return definition;
}
