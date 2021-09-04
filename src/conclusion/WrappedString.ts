import type { Option, Branded } from '../utils';
import { some, none } from '../utils';

// An interface that all wrapped strings support
export interface WrappedString {
  value: string;
}

/** Create a wrapped value option
 *  1) canonicalize the input first
 *  2) If the validation succeeds, return Some of the given constructor
 *  3) If the validation fails, return None
 *  Null values are never valid.  */
export const create = <A>(canonicalize: (s: string) => A) =>
  (isValid: (a: A) => boolean) =>
  <B>(ctor: (a: A) => B) =>
  (s: string): Option<B> => {

  if (s === null) {
    return none
  } else {
    const cs = canonicalize(s)
    if (isValid(cs)) {
      return some(ctor(cs))
    } else {
      return none
    }
  }
}

// Apply the given function to wrapped value
export const apply = <A>(f: (s: string) => A) => (s: WrappedString): A => {
  return f(s.value)
}

// Get the wrapped value
export const value = (s: WrappedString): string => {
  const id = <A>(a: A): A => a;
  return apply(id)(s)
}

// Equality test
export const equals = (left: WrappedString) => (right: WrappedString) => {
  return value(left) === value(right)
}

// Comparison 
export const compareTo = (left: WrappedString) => (right: WrappedString) => {
  return value(left) < value(right)
}

/** Canonicalizes a string before construction
 *  * converts all whitespace to space char
 *  * trim both ends */
export const singleLineTrimmed = (s: string) => {
  return s.replace(/\s/g, ' ').trim();
}

// A validation function based on length
export const lengthValidator = (len: number) => (s: string) => {
  return s.length <= len;
}

// TODO:
type _String100 = Branded<string, 'String100'>;
const _String100 = (s: string) => s as _String100;
// A string of length 100
export class String100 implements WrappedString {
  constructor(readonly value: string) {
    this.value = _String100(value);
  }
}

// A constructor for strings of length 100
export const string100 = create(singleLineTrimmed)(lengthValidator(100))(
  (s: string) => new String100(s)
)

// Converts a wrapped string to string of length 100
export const convertTo100 = (s: WrappedString) => {
  return apply(string100)(s)
}

// TODO:
type _String50 = Branded<string, 'String50'>;
const _String50 = (s: string) => s as _String50;
// A string of length 50
export class String50 implements WrappedString {
  constructor(readonly value: string) {
    this.value = _String50(value);
  }
}

// A constructor for strings of length 50
export const string50 = create(singleLineTrimmed)(lengthValidator(50))(
  (s: string) => new String50(s)
)

// Converts a wrapped string to a string of length
export const convertTo50 = (s: WrappedString) => {
  return apply(string50)(s)
}

// TODO:
type _Text1000 = Branded<string, 'Text100'>;
const _Text1000 = (s: string) => s as _Text1000;
export class Text1000 implements WrappedString {
  constructor(readonly value: string) {
    this.value = _Text1000(value);
  }
}

const id = <A>(a: A): A => a;
export const text1000 = create(id)(lengthValidator(1000))((s: string) => new Text1000(s));

// map helpers
export const mapAdd = (k: WrappedString) => <V>(v: V) => (map: Map<string, V>) => {
  return map.set(value(k), v)
};

export const mapContainsKey = (k: WrappedString) => <V>(map: Map<string, V>) => {
  return map.has(value(k))
};

export const mapTryFind = (k: WrappedString) => <V>(map: Map<string, V>): Option<V> => {
  const v = map.get(value(k))
  return v ? some(v) : none;
};

