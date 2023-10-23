import { makeCustomError, type BaseError } from '@hydra-ipxe/common/shared/errors';
import { Prisma } from '@prisma/client';

import { PrismaErrorCode } from '../codes';
import { remapPrismaError } from '../errors';

const CustomError = makeCustomError('CustomError');

describe('remapPrismaError', () => {
  it('should return the original error if it is not a Prisma error', () => {
    const error = new Error('test');
    const result = remapPrismaError({ error, throw: new CustomError('custom error') });

    expect(result).toBe(error);
  });

  it('should return the original error if error code does not match thrown Prisma error code', () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError('test', {
      code: PrismaErrorCode.RecordDoesNotExist,
      clientVersion: 'test-version',
    });

    const result = remapPrismaError({
      error: prismaError,
      throw: new CustomError('custom error'),
      code: PrismaErrorCode.ConstraintViolation,
    });
    expect(result).toBe(prismaError);
  });

  it('remaps prisma error to custom error with code', () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError('test', {
      code: PrismaErrorCode.RecordDoesNotExist,
      clientVersion: 'test-version',
    });

    const result = remapPrismaError({
      error: prismaError,
      throw: new CustomError('custom error'),
      code: PrismaErrorCode.RecordDoesNotExist,
    });

    expect(result).toBeInstanceOf(CustomError);
  });

  it('remaps prisma error to custom error', () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError('test', {
      code: PrismaErrorCode.RecordDoesNotExist,
      clientVersion: 'test-version',
    });

    const result = remapPrismaError({
      error: prismaError,
      throw: new CustomError('custom error'),
    });

    expect(result).toBeInstanceOf(CustomError);
  });

  it('adds original error to error stack', () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError('test', {
      code: PrismaErrorCode.RecordDoesNotExist,
      clientVersion: 'test-version',
    });

    const result = remapPrismaError({
      error: prismaError,
      throw: new CustomError('custom error'),
    }) as BaseError;

    expect(result.errorStack).toContain(prismaError);
  });

  it('returns original error if fields does not match', () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError('test', {
      code: PrismaErrorCode.RecordDoesNotExist,
      clientVersion: 'test-version',
    });

    const result = remapPrismaError({
      error: prismaError,
      throw: new CustomError('custom error'),
      field: 'test',
    });

    expect(result).toBe(prismaError);
  });

  it('remaps prisma error to custom error with field', () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError('test', {
      code: PrismaErrorCode.RecordDoesNotExist,
      clientVersion: 'test-version',
      meta: {
        target: ['test'],
      },
    });

    const result = remapPrismaError({
      error: prismaError,
      throw: new CustomError('custom error'),
      field: 'test',
    });

    expect(result).toBeInstanceOf(CustomError);
  });
});
