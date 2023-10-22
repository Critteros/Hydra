import { Prisma } from '@prisma/client';
import type { Constructor } from 'type-fest';

import { PrismaErrorCode } from './errors';

type PrismaErrors =
  | Constructor<Prisma.PrismaClientInitializationError>
  | Constructor<Prisma.PrismaClientValidationError>
  | Constructor<Prisma.PrismaClientRustPanicError>
  | Constructor<Prisma.PrismaClientKnownRequestError>
  | Constructor<Prisma.PrismaClientUnknownRequestError>;

/**
 * Remaps a Prisma error based on provided parameters. Throws an error if the original error does
 * not match the specified Prisma error type, code, or field.
 *
 * @example
 *   remapPrismaError({
 *     error: new Prisma.PrismaClientInitializationError('Prisma client initialization failed'),
 *     code: 'P2002',
 *     throw: new Error('Custom error message'),
 *   });
 *
 * @param {object} params - The parameters for the remap operation.
 * @param {unknown} params.error - The original error to be remapped.
 * @param {PrismaErrors} [params.toMatchError] - The specific Prisma error type to match against.
 *   Default is `Prisma.PrismaClientKnownRequestError`.
 * @param {PrismaErrorCode} [params.code] - The specific error code to match against.
 * @param {string} [params.field] - The specific field name to match against.
 * @param {Error} params.throw - The error to be thrown if remapping is successful.
 * @throws {Error} - Throws the original error if it does not match the specified Prisma error type,
 *   code, or field.
 */
export function remapPrismaError(params: {
  error: unknown;
  toMatchError?: PrismaErrors;
  code?: PrismaErrorCode;
  field?: string;
  throw: Error;
}) {
  const {
    error: originalError,
    toMatchError = Prisma.PrismaClientKnownRequestError,
    code,
    field,
    throw: throwError,
  } = params;

  if (!(originalError instanceof Error)) {
    throw originalError;
  }

  if (!(originalError instanceof toMatchError)) {
    throw originalError;
  }

  switch (originalError.constructor) {
    case Prisma.PrismaClientInitializationError: {
      const typedError = originalError as Prisma.PrismaClientInitializationError;
      if (code && typedError.errorCode !== (code as string)) {
        throw originalError;
      }
      throw throwError;
    }
    case Prisma.PrismaClientValidationError: {
      throw throwError;
    }
    case Prisma.PrismaClientRustPanicError: {
      throw throwError;
    }
    case Prisma.PrismaClientKnownRequestError: {
      const typedError = originalError as Prisma.PrismaClientKnownRequestError;
      if (code && typedError.code !== (code as string)) {
        throw originalError;
      }
      if (
        field &&
        !(typedError.meta as { target: string[] } | undefined)?.target?.includes(field)
      ) {
        throw originalError;
      }
      throw throwError;
    }
    case Prisma.PrismaClientUnknownRequestError: {
      throw throwError;
    }
  }

  throw originalError;
}
