import type { Branded, Option, Unwrap } from '../utils';
import { some, none } from '../utils';

const isZipCode = (s: string): s is T => /^\d{5}$/.test(s);

export type T = Branded<string, 'ZipCode'>;

// create with continuation
export const createWithCont = <A>(success: (a: T) => A) => (failure: (s: string) => A) => (email: string) => {
  return isZipCode(email) ? success(email) : failure("Zip code must be 5 digits");
};

// create directly
export const create = (email: string): Option<T> => {
  const success = <A>(e: A) => some(e)
  const failure = (_: unknown) => none

  return createWithCont(success)(failure)(email)
};

// unwrap with continuation
export const apply = <A>(f: (s: string) => A) => (e: T) => f(e);

// unwrap directly
export const value = (e: T): Unwrap<T> => {
  const id = <A>(a: A): A => a;

  return apply(id)(e)
}
