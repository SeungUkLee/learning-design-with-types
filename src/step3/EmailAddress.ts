import type { Branded, Option, Unwrap } from "../utils";
import { some, none } from "../utils";

const isEmailAddress = (s: string): s is T => /\S+@\S+\.\S+/.test(s);

export type T = Branded<string, 'EmailAddress'>;

// create with continuation
export const createWithCont = <A>(success: (a: T) => A) => (failure: (s: string) => A) => (email: string) => {
  return isEmailAddress(email) ? success(email) : failure("Email address must contain an @ sign");
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
// export const value = (e: T): Unwrap<T> => e;
