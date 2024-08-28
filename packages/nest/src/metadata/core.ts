import 'reflect-metadata/lite';

import { mergeObjects, isObject, isArray } from '@hydra-ipxe/utils/object';

export type MetadataTarget = {
  object: object;
  key: string | symbol;
};

/**
 * Sets metadata value under a given key Metadata can be set on:
 *
 * - Static property (using `ClassType`)
 * - Property (using `ClassType.prototype`)
 * - Static method (using `ClassType`)
 * - Method (using `ClassType.prototype`)
 *
 * @param target
 * @param key
 * @param value
 */
export function setMetadata<Key = PropertyKey, Value = unknown>(
  target: MetadataTarget,
  key: Key,
  value: Value,
) {
  Reflect.defineMetadata(key, value, target.object, target.key);
}

/**
 * Returns metadata value under given key
 *
 * @param target
 * @param key
 */
export function getMetadata<Key = PropertyKey, Value = unknown>(
  target: MetadataTarget,
  key: Key,
): Value {
  return Reflect.getMetadata(key, target.object, target.key) as Value;
}

export function insertMetadata<Key = PropertyKey, Value = object>(
  target: MetadataTarget,
  key: Key,
  value: Value,
) {
  const oldValue = getMetadata(target, key);

  if (isObject(oldValue) && isObject(value)) {
    setMetadata(target, key, mergeObjects([oldValue, value]));
    return;
  }
  if (isArray(oldValue) && isArray(value)) {
    setMetadata(target, key, [...oldValue, ...value]);
    return;
  }
  setMetadata(target, key, value);
}
