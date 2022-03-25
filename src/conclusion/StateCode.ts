import type { Branded } from "../utils";
import * as WrappedString from './WrappedString';

// TODO:
type _StateCode = Branded<string, 'StateCode'>;
const _StateCode = (s: string) => s as _StateCode;
export class T implements WrappedString.WrappedString {
  constructor(readonly value: string) {
    this.value = _StateCode(value);
  }
}

const canonicalize = WrappedString.singleLineTrimmed;
const isValid = (s: string) => {
  const sUpper = s.toUpperCase();
  const stateCodes = ["AZ", "CA", "NY"];

  return stateCodes.includes(sUpper);
}

export const create = WrappedString.create(canonicalize)(isValid)((s: string) => new T(s));

// Converts any wrapped string to StateCode.
export const convert = (s: WrappedString.WrappedString) => WrappedString.apply(create)(s)

