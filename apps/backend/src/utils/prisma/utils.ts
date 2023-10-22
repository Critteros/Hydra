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
 * Remaps a Prisma error based on specific conditions and throws a new error if necessary. If the
 * original error does not match any of the specified conditions, it is returned as-is.
 *
 * @param {object} params - The parameters for the remapPrismaError function
 * @param {unknown} params.error - The original error to be remapped
 * @param {PrismaErrors} [params.toMatchError] - The specific Prisma error class to match (default:
 *   Prisma.PrismaClientKnownRequestError)
 * @param {PrismaErrorCode} [params.code] - The specific error code to match
 * @param {string} [params.field] - The specific field to match
 * @param {Error} params.throw - The error to be thrown if the original error matches the specified
 *   conditions
 * @returns {unknown} - The remapped error or the original error if it does not match any conditions
 */
export function remapPrismaError(params: {
  error: unknown;
  toMatchError?: PrismaErrors;
  code?: PrismaErrorCode;
  field?: string;
  throw: Error;
}): unknown {
  const {
    error: originalError,
    toMatchError = Prisma.PrismaClientKnownRequestError,
    code,
    field,
    throw: throwError,
  } = params;

  if (!(originalError instanceof Error)) {
    return originalError;
  }

  if (!(originalError instanceof toMatchError)) {
    return originalError;
  }

  switch (originalError.constructor) {
    case Prisma.PrismaClientInitializationError: {
      const typedError = originalError as Prisma.PrismaClientInitializationError;
      if (code && typedError.errorCode !== (code as string)) {
        return originalError;
      }
      return throwError;
    }
    case Prisma.PrismaClientValidationError: {
      return throwError;
    }
    case Prisma.PrismaClientRustPanicError: {
      return throwError;
    }
    case Prisma.PrismaClientKnownRequestError: {
      const typedError = originalError as Prisma.PrismaClientKnownRequestError;
      if (code && typedError.code !== (code as string)) {
        return originalError;
      }
      if (
        field &&
        !(typedError.meta as { target: string[] } | undefined)?.target?.includes(field)
      ) {
        return originalError;
      }
      return throwError;
    }
    case Prisma.PrismaClientUnknownRequestError: {
      return throwError;
    }
  }

  return originalError;
}
