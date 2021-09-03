import type { Branded, Option, Unwrap } from '../utils';
import { some, none } from '../utils';
import * as WrappedString from './WrappedString';

// TODO:
type _ZipCode = Branded<string, 'ZipCode'>;
const _ZipCode = (s: string) => s as _ZipCode;
export class T implements WrappedString.WrappedString {
  constructor(readonly value: string) {
    this.value = _ZipCode(value)
  }
}

const canonicalize = WrappedString.singleLineTrimmed;
const isValid = (s: string) => /^\d{5}$/.test(s);

export const create = WrappedString.create(canonicalize)(isValid)((s: string) => new T(s));

// Converts any wrapped string to a ZipCode.
export const convert = (s: WrappedString.WrappedString) => WrappedString.apply(create)(s)

