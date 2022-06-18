import type { Branded } from "../utils";
import * as WrappedString from './WrappedString'

// const isEmailAddress = (s: string): s is T => /\S+@\S+\.\S+/.test(s);
const isEmailAddress = (s: string) => /\S+@\S+\.\S+/.test(s);

// TODO:
type _EmailAddress = Branded<string, 'EmailAddress'>;
const _EmailAddress = (s: string) => s as _EmailAddress;
export class T implements WrappedString.WrappedString {
  constructor(readonly value: string) {
    this.value = _EmailAddress(value)
  }
}

const canonicalize = WrappedString.singleLineTrimmed;
const isValid = (s: string) => WrappedString.lengthValidator(100)(s) && isEmailAddress(s);


export const create = WrappedString.create(canonicalize)(isValid)((s: string) => new T(s));

// Converts any wrapped string to an EmailAddress.
export const convert = (s: WrappedString.WrappedString) => WrappedString.apply(create)(s);
