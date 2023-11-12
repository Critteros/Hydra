import type { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';

import { mock } from 'jest-mock-extended';

import { MetadataService } from '../metadata.service';

class TargetClass {}
function targetFunction() {}

const mockReflector = mock<Reflector>();
const mockContext = mock<ExecutionContext>();
const testDecorator = Reflector.createDecorator();

describe('Test MetdataService', () => {
  let metadataService: MetadataService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [MetadataService],
    })
      .overrideProvider(Reflector)
      .useValue(mockReflector)
      .compile();

    metadataService = moduleRef.get(MetadataService);
    mockContext.getClass.mockReturnValue(TargetClass);
    mockContext.getHandler.mockReturnValue(targetFunction);
  });

  it.each`
    classMetadata                             | handlerMetadata                           | priority     | expected                                                     | selector
    ${'class data'}                           | ${'handler data'}                         | ${'handler'} | ${'handler data'}                                            | ${(data: any) => data}
    ${'class data'}                           | ${'handler data'}                         | ${'class'}   | ${'class data'}                                              | ${(data: any) => data}
    ${1}                                      | ${2}                                      | ${'handler'} | ${2}                                                         | ${(data: any) => data}
    ${1}                                      | ${2}                                      | ${'class'}   | ${1}                                                         | ${(data: any) => data}
    ${undefined}                              | ${2}                                      | ${'handler'} | ${2}                                                         | ${(data: any) => data}
    ${undefined}                              | ${2}                                      | ${'class'}   | ${2}                                                         | ${(data: any) => data}
    ${2}                                      | ${undefined}                              | ${'handler'} | ${2}                                                         | ${(data: any) => data}
    ${2}                                      | ${undefined}                              | ${'class'}   | ${2}                                                         | ${(data: any) => data}
    ${null}                                   | ${2}                                      | ${'handler'} | ${2}                                                         | ${(data: any) => data}
    ${null}                                   | ${2}                                      | ${'class'}   | ${null}                                                      | ${(data: any) => data}
    ${2}                                      | ${null}                                   | ${'handler'} | ${null}                                                      | ${(data: any) => data}
    ${2}                                      | ${null}                                   | ${'class'}   | ${2}                                                         | ${(data: any) => data}
    ${[1, 2, 3]}                              | ${[2, 3, 4]}                              | ${'handler'} | ${[2, 3, 4, 1]}                                              | ${(data: any) => data}
    ${[1, 2, 3]}                              | ${[2, 3, 4]}                              | ${'class'}   | ${[1, 2, 3, 4]}                                              | ${(data: any) => data}
    ${[]}                                     | ${[1, 2]}                                 | ${'handler'} | ${[1, 2]}                                                    | ${(data: any) => data}
    ${[]}                                     | ${[1, 2]}                                 | ${'class'}   | ${[1, 2]}                                                    | ${(data: any) => data}
    ${[{ id: 1, m: 'a' }, { id: 2, m: 'b' }]} | ${[{ id: 2, m: 'c' }, { id: 3, m: 'd' }]} | ${'handler'} | ${[{ id: 2, m: 'c' }, { id: 3, m: 'd' }, { id: 1, m: 'a' }]} | ${(data: any) => data.id}
    ${[{ id: 1, m: 'a' }, { id: 2, m: 'b' }]} | ${[{ id: 2, m: 'c' }, { id: 3, m: 'd' }]} | ${'class'}   | ${[{ id: 1, m: 'a' }, { id: 2, m: 'b' }, { id: 3, m: 'd' }]} | ${(data: any) => data.id}
  `(
    'merges class and method metadata',
    ({ classMetadata, handlerMetadata, priority, expected, selector }) => {
      mockReflector.get.mockImplementation((decorator, target) => {
        if (target === TargetClass) {
          return classMetadata;
        }
        if (target === targetFunction) {
          return handlerMetadata;
        }
        return undefined;
      });
      expect(
        metadataService.getDecoratorMetadata({
          context: mockContext,
          decorator: testDecorator,
          selector,
          priority,
        }),
      ).toEqual(expected);
    },
  );
});
