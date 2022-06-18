import type { Branded, Option } from "../utils";
import { some, none } from '../utils';

const isStateCodes = (s: string): s is T => {
  const sUpper = s.toUpperCase();
  const stateCodes = ["AZ", "CA", "NY"];

  return stateCodes.includes(sUpper);
}

export type T = Branded<string, 'StateCode'>;

// create with continuation
export const createWithCont = <A>(success: (a: T) => A) => (failure: (s: string) => A) => (s: string) => {
  return isStateCodes(s) ? success(s) : failure("State is not in list.");
}

// create directly
export const create = (s: string): Option<T> => {
  const success = (e: T) => some(e)
  const failure = (_: unknown) => none

  return createWithCont(success)(failure)(s)
}

// unwrap with continuation
export const apply = <A>(f: (s: string) => A) => (e: T) => f(e);

// unwrap directly
export const value = (e: T): string => {
  const id = <A>(a: A): A => a;
  return apply(id)(e)
}

