import type { Constructor } from 'type-fest';

/**
 * Represents a base error class.
 *
 * @extends Error
 */
export class BaseError extends Error {
  public errorStack: Array<unknown> = [];
}

type RemapInput = {
  if: Constructor<Error>;
  then: unknown;
};

/**
 * Remaps errors based on a given mapping.
 *
 * @param {RemapInput | RemapInput[]} mapping - The mapping to remap the errors.
 * @returns {Function} - A function that takes an error and returns the remapped error.
 */
export function remapErrors(mapping: RemapInput | Array<RemapInput>): (err: unknown) => unknown {
  const mappings = Array.isArray(mapping) ? mapping : [mapping];

  return (error: unknown): unknown => {
    const entry = mappings.find(({ if: errorType }) => error instanceof errorType);
    if (!entry) {
      return error;
    }
    const { then: mappedError } = entry;

    if (mappedError instanceof BaseError) {
      mappedError.errorStack.push(error);
    }

    return mappedError;
  };
}

/**
 * Creates a custom error class with the given name and optional formatter function.
 *
 * @param {string} name - The name of the custom error class.
 * @param {function} [formatter] - A function to format the error message. It takes in a message
 *   string and returns a formatted message string. If not provided, the original message will be
 *   used.
 * @returns {Object} - The custom error class.
 */
export function makeCustomError(
  name: string,
  formatter?: (message: string) => string,
): Constructor<BaseError> {
  const definition = class extends BaseError {
    constructor(message: string) {
      const formattedMessage = formatter ? formatter(message) : message;
      super(formattedMessage);
      this.name = name;
    }
  };
  Object.defineProperty(definition, 'name', { value: name });
  return definition;
}

export function MapErrors<FnT extends (...args: unknown[]) => unknown>(
  mapping: Parameters<typeof remapErrors>[0],
): MethodDecorator {
  const remapper = remapErrors(mapping);

  return ((target, propertyKey, descriptor: TypedPropertyDescriptor<FnT>) => {
    const originalFn = descriptor.value;

    descriptor.value = function (...args: unknown[]) {
      try {
        return originalFn?.(...args);
      } catch (e) {
        throw remapper(e);
      }
    } as FnT;
  }) as MethodDecorator;
}
