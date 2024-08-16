import type { MaybePromise } from './async';
import type { AnyObject, EmptyObject } from './objects';

// Represents generic callback
export type Callback<ReturnType = void, Args extends unknown[] = []> = (
  ...args: Args
) => ReturnType;

// Callback with no arguments that return void or Promise<void>
export type SimpleCallback = Callback<MaybePromise<void>>;

// Callback returning void with no arguments
export type SimpleSyncCallback = Callback;

// Callback returning Promise<void> with no arguments
export type SimpleAsyncCallback = Callback<Promise<void>>;

// Represents standard function that takes only one argument
// This argument is TS object which contains all arguments that would be passed to the functions
// This emulates keywords arguments from other languages in order to eliminate the possibility of misplacing the arguments
export type StandardFunction<Options extends AnyObject = EmptyObject, ReturnType = void> = (
  options?: Options,
) => ReturnType;

export type { Callback as Func };
