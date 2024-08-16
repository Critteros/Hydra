# @hydra-ipxe/common

Package containing various Typescript utilities

## Object utilities - `@hydra-ipxe/utils/object`

### `invert`

Inverts the key and values of an object, providing type inference when used with const object

```ts
// returns { b: 'a', c: 'd' }
invert({
    a: 'b',
    c: 'd',
});
```

### `select`

Select nested property from passed object using key path

```ts
// returns 3
select({ a: { nestedA: 3 }, b: 7 }, 'a.nestedA');

// returns 3
select({ arr: [2, 3] }, 'arr.1');
```

### `mergeObjectsWithPriority`

Merges objects according to the provided priority

Providing:

- Primitive value -> causes previous value to be overridden
- Array to an array -> extends the original array
- Object to an object -> recursively merges provided object with previous value
- Object or array to a primitive -> overrides value

```ts
// returns { a: 70, b: 4, c: [1, 2, 3, 4], d: { a: 4, b: 7 } }
mergeObjectsWithPriority([
  {
    priority: 10,
    objectData: { a: 70, c: [3, 4], d: { a: 4 } },
  },
  {
    priority: 0,
    objectData: { a: 0, b: 4, c: [1, 2], d: { a: 1, b: 7 } },
  },
]);
```

### `mergeObjects`

Shortcut for calling `mergeObjectsWithPriority` that infers the priority from position in the array, element with higher index
override elements with lower index

```ts
// returns { a: 70, b: 4, c: [1, 2, 3, 4], d: { a: 4, b: 7 } }
mergeObjectsWithPriority([
  { a: 0, b: 4, c: [1, 2], d: { a: 1, b: 7 } },
  { a: 70, c: [3, 4], d: { a: 4 } },
]);
```

### `isPrimitive`

Test for a one of the below types

- `null`
- `undefined`
- `number`
- `string`
- `boolean`
- `symbol`
- `bigint`

Object wrappers (`Boolean`, `String`, `Number`) used without the `new` keyword does not have `object` type and will pass the test

```ts
// returns true
isPrimitive(null);
isPrimitive(undefined);
isPrimitive(1);
isPrimitive('string');
isPrimitive(true);
isPrimitive(Symbol());
isPrimitive(BigInt(Number.MAX_SAFE_INTEGER));
isPrimitive(String('object wrapper'));
isPrimitive(Number(10));
isPrimitive(Boolean(true));

// returns false
isPrimitive({});
isPrimitive({ a: 3 });
isPrimitive(new String('object wrapper'));
isPrimitive(new Number(10));
isPrimitive(new Boolean(true));
```

### `isPrimitiveWrapper` 

Test if passed value is of a primitive wrapper type (`Number`, `String`, `Boolean`)

```ts
// returns true
isPrimitiveWrapper(new Number(123));
isPrimitiveWrapper(new String(''));
isPrimitiveWrapper(new Boolean(false));

// returns false
isPrimitiveWrapper(Number(123));
isPrimitiveWrapper(String(''));
isPrimitiveWrapper(Boolean(false));
isPrimitiveWrapper(true);
isPrimitiveWrapper('');
isPrimitiveWrapper(123);
```

### `isPrimitiveOrWrapper`

Combines the results of `isPrimitiveWrapper` and `isPrimitive`

```ts
// returns true
isPrimitive(null);
isPrimitive(undefined);
isPrimitive(1);
isPrimitive('string');
isPrimitive(true);
isPrimitive(Symbol());
isPrimitive(BigInt(Number.MAX_SAFE_INTEGER));
isPrimitive(String('object wrapper'));
isPrimitive(Number(10));
isPrimitive(Boolean(true));
isPrimitive(new String('object wrapper'));
isPrimitive(new Number(10));
isPrimitive(new Boolean(true));

// returns false
isPrimitive({});
isPrimitive({ a: 3 });
```

### `isString`

Test if value is of a string or string wrapper type

```ts
// returns true
isString('123');
isString(new String('object wrapper'));
isString(String('object wrapper'));

// returns false
isString(null);
isString(false);
```

### `isNumber`

Test if value is of a number of number wrapper type

```ts
// returns true
isNumber(2);
isNumber(new Number(3));
iseNumber(Number(4));

// returns false
isNumber('string');
isNumber(null);
```

### `isArray`

Test if value is of an array type

```ts
// returns true
isArray([])
isArray([1,2,3]

// returns false
isArray({});
isArray(null);
```

### `isObject`

Test if value is of an object type not including the array type

```ts
// returns true
isObject({});

// returns false
isObject([]);
```

## Error utilities - `@hydra-ipxe/utils/errors`

### `makeErrorCls`

Shortcut for creating custom error classes. An optional parameter can be provided that dictates the base error class, a `Error` class will be used by default

```ts
const CustomError = makeErrorCls('CustomError');
throw new CustomError('Error message');

const CustomTypeError = makeErrorCls('CustomError', TypeError);
throw new CustomError('Error message');
```

## Compare utilities - `@hydra-ipxe/utils/compare`

### `ascending`

Utility for sorting items in ascending order

```ts
// returns [1, 2, 3, 5, 7, 8]
[5, 3, 7, 8, 1, 2].toSorted(ascending());

// returns ['a', 'b', 'c', 'd', 'x', 'z']
['b', 'd', 'z', 'x', 'c', 'a'].toSorted(ascending());

// returns [{ key: 1 }, { key: 2 }]
[{ key: 2 }, { key: 1 }].toSorted(ascending('key'));
```

### `descending`

Utility for sorting items in descending order

```ts
// returns [8, 7, 5, 3, 2, 1]
[5, 3, 7, 8, 1, 2].toSorted(ascending());

// returns ['z', 'x', 'd', 'c', 'b', 'a']
['b', 'd', 'z', 'x', 'c', 'a'].toSorted(ascending());

// returns [{ key: 2 }, { key: 1 }]
[{ key: 1 }, { key: 2 }].toSorted(ascending('key'));
```

## Type utilities - `@hydra-ipxe/utils/types`

### Async types

- `MaybePromise<T>` Represents `T` or `Promise<T>`
- `UnwrapPromise<T>` Unwraps inner type from a `Promise`

### Functional types

- `Callback` or `Func` Create a function type with the passed return type and argument list
- `SimpleCallback` Callback that returns `void` or `Promise<void>` and does not take any arguments
- `SimpleSyncCallback` Callback that returns `void` and does not take any arguments
- `SimpleAsyncCallback` Callback that returns `Promise<void>` and does not take any arguments
- `StandardFunction` Represents function that returns provided type and accepts single object as argument list

### Object types

- `AnyObject` Represent any TS object
- `EmptyObject` Represents an empty literal TS object (`{}`)
- `Invert` Inverts key and values of an object type
- `Leaves` All edge paths in an object
- `Paths` All paths in an object
- `Primitive` Union of all primitive types in TS
- `SelectIn` Extract a type of value from object using key path
- `DeppPartial` Recursively sets all values in object as optional 