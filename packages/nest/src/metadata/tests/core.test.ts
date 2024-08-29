import { beforeEach, describe, expect, test } from 'vitest';

import { setMetadata, type MetadataTarget, getMetadata, insertMetadata } from '../core';

declare module 'vitest' {
  export interface TestContext {
    TargetClass: any;
    KEY: symbol;
  }
}

describe.concurrent('Metadata core logic', () => {
  let TargetClass: any;
  let KEY: symbol;

  beforeEach((context) => {
    context.TargetClass = class {
      static staticProperty = 123;

      static staticMethod() {
        return 123;
      }

      regularProperty = 10;

      regularMethod() {
        return 10;
      }
    };
    context.KEY = Symbol();
  });

  test('works on static property', ({ TargetClass, KEY }) => {
    const target: MetadataTarget = {
      key: 'staticProperty',
      object: TargetClass,
    };

    expect(getMetadata(target, KEY)).toBeUndefined();
    setMetadata(target, KEY, '123');
    expect(getMetadata(target, KEY)).toStrictEqual('123');
  });

  test('works on static method', ({ TargetClass, KEY }) => {
    const target: MetadataTarget = {
      key: 'staticMethod',
      object: TargetClass,
    };

    expect(getMetadata(target, KEY)).toBeUndefined();
    setMetadata(target, KEY, '987');
    expect(getMetadata(target, KEY)).toStrictEqual('987');
  });

  test('works on regular property', ({ TargetClass, KEY }) => {
    const target: MetadataTarget = {
      key: 'regularProperty',
      object: TargetClass.prototype,
    };

    expect(getMetadata(target, KEY)).toBeUndefined();
    setMetadata(target, KEY, {});
    expect(getMetadata(target, KEY)).toStrictEqual({});
  });

  test('works on regular method', ({ TargetClass, KEY }) => {
    const target: MetadataTarget = {
      key: 'regularMethod',
      object: TargetClass.prototype,
    };

    expect(getMetadata(target, KEY)).toBeUndefined();
    setMetadata(target, KEY, { a: 3 });
    expect(getMetadata(target, KEY)).toStrictEqual({ a: 3 });
  });

  test('insertMetadata with primitive', ({ TargetClass, KEY }) => {
    const target: MetadataTarget = {
      key: 'regularMethod',
      object: TargetClass.prototype,
    };

    const x = getMetadata(target, KEY);
    expect(getMetadata(target, KEY)).toBeUndefined();
    insertMetadata(target, KEY, 1);
    expect(getMetadata(target, KEY)).toBe(1);

    insertMetadata(target, KEY, 30);
    expect(getMetadata(target, KEY)).toBe(30);
  });

  test('insertMetadata with array', ({ TargetClass, KEY }) => {
    const target: MetadataTarget = {
      key: 'regularMethod',
      object: TargetClass.prototype,
    };

    expect(getMetadata(target, KEY)).toBeUndefined();
    insertMetadata(target, KEY, [1, 2]);
    expect(getMetadata(target, KEY)).toStrictEqual([1, 2]);

    insertMetadata(target, KEY, [4, 5]);
    expect(getMetadata(target, KEY)).toStrictEqual([1, 2, 4, 5]);
  });

  test('insertMetadata with object', ({ TargetClass, KEY }) => {
    const target: MetadataTarget = {
      key: 'regularMethod',
      object: TargetClass.prototype,
    };

    expect(getMetadata(target, KEY)).toBeUndefined();
    insertMetadata(target, KEY, { a: 3 });
    expect(getMetadata(target, KEY)).toStrictEqual({ a: 3 });

    insertMetadata(target, KEY, { c: [1, 2, 3] });
    expect(getMetadata(target, KEY)).toStrictEqual({ a: 3, c: [1, 2, 3] });
  });
});
