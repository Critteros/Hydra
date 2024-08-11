import { expectTypeOf, describe, test } from 'vitest';

import type { EmptyObject } from '@/types/objects';

import type {
  Callback,
  SimpleCallback,
  SimpleSyncCallback,
  SimpleAsyncCallback,
  StandardFunction,
} from '../functional';

describe('functional type utilities', () => {
  test('Callback utility type defaults', () => {
    type TestType = Callback;
    expectTypeOf<TestType>().toBeFunction();
    expectTypeOf<TestType>().parameter(0).toBeUndefined();
    expectTypeOf<TestType>().parameters.toEqualTypeOf<[]>();
    expectTypeOf<TestType>().returns.toBeVoid();
  });

  test('Callback utility usage', () => {
    type TestType = Callback<Promise<number>, [number, string]>;
    expectTypeOf<TestType>().toBeFunction();
    expectTypeOf<TestType>().parameter(0).toBeNumber();
    expectTypeOf<TestType>().parameter(1).toBeString();
    expectTypeOf<TestType>().parameter(2).toBeUndefined();
    expectTypeOf<TestType>().parameters.toEqualTypeOf<[number, string]>();
    expectTypeOf<TestType>().returns.toEqualTypeOf<Promise<number>>();
  });

  test('SimpleCallback utility usage', () => {
    expectTypeOf<SimpleCallback>().toBeFunction();
    expectTypeOf<SimpleCallback>().parameter(0).toBeUndefined();
    expectTypeOf<SimpleCallback>().parameters.toEqualTypeOf<[]>();
    expectTypeOf<SimpleCallback>().returns.toEqualTypeOf<void | Promise<void>>();
  });

  test('SimpleSyncCallback utility usage', () => {
    expectTypeOf<SimpleSyncCallback>().toBeFunction();
    expectTypeOf<SimpleSyncCallback>().parameter(0).toBeUndefined();
    expectTypeOf<SimpleSyncCallback>().parameters.toEqualTypeOf<[]>();
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    expectTypeOf<SimpleSyncCallback>().returns.toEqualTypeOf<void>();
  });

  test('SimpleAsyncCallback utility usage', () => {
    expectTypeOf<SimpleAsyncCallback>().toBeFunction();
    expectTypeOf<SimpleAsyncCallback>().parameter(0).toBeUndefined();
    expectTypeOf<SimpleAsyncCallback>().parameters.toEqualTypeOf<[]>();
    expectTypeOf<SimpleAsyncCallback>().returns.toEqualTypeOf<Promise<void>>();
  });

  test('StandardFunction utility usage - defaults', () => {
    expectTypeOf<StandardFunction>().toBeFunction();
    expectTypeOf<StandardFunction>().parameter(0).toEqualTypeOf<EmptyObject | undefined>();
    expectTypeOf<StandardFunction>().parameter(1).toBeUndefined();
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    expectTypeOf<StandardFunction>().returns.toEqualTypeOf<void>();
  });

  test('StandardFunction utility usage', () => {
    type TestType = StandardFunction<{ param1: number; param2: string }, string>;
    expectTypeOf<TestType>().toBeFunction();
    expectTypeOf<TestType>()
      .parameter(0)
      .toEqualTypeOf<{ param1: number; param2: string } | undefined>();
    expectTypeOf<TestType>().parameter(1).toBeUndefined();
    expectTypeOf<TestType>().returns.toEqualTypeOf<string>();
  });
});
