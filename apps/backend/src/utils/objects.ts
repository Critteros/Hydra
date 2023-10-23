/**
 * Excludes specified keys from an object.
 *
 * @template ObjT - The type of the object.
 * @template Key - The type of the keys to exclude.
 * @param {ObjT} obj - The input object.
 * @param {Key[]} keys - The keys to exclude.
 * @returns {Omit<ObjT, Key>} - The newly created object without the specified keys.
 */
export function exclude<ObjT extends object, Key extends keyof ObjT>(
  obj: ObjT,
  keys: Key[],
): Omit<ObjT, Key> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as Key)),
  ) as Omit<ObjT, Key>;
}
