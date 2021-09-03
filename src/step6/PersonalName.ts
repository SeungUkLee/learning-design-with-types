import type { Option } from '../utils';
import type { String50, String100 } from './WrappedString';
import { string50, string100, value } from './WrappedString';
import { some, none } from '../utils';

export type T = {
  firstName: String50;
  lastName: String100;
}

export const create = (first: string) => (last: string): Option<T> => {
  const f = string50(first);
  const l = string100(last);

  if (f._tag === 'Some' && l._tag === 'Some') {
    return some({ firstName: f.value, lastName: l.value })
  } else {
    return none
  }
}

// concat the first and last names together and return a raw string
export const fullNameRaw = (personalName: T) => {
  const f = value(personalName.firstName);
  const v = value(personalName.lastName);

  return f + " " + v;
}

export const fullNameOption = (personalName: T) => {
  return string100(fullNameRaw(personalName))
}

export const fullNameTruncated = (personalName: T) => {
  const left = (n: number) => (s: string) => s.length > n ? s.substring(0, n) : s;

  return string100(left(100)(fullNameRaw(personalName)))
}
