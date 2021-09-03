import type { Branded, Option } from '../../utils'
import { some, none } from '../../utils'

type String100 = Branded<string, 'String100'>

export type T = String100;

const isString100 = (s: string): s is String100 => s.length <= 100;

export const create = (s: string): Option<T> => {
  return isString100(s) ? some(s) : none
}

export const apply = <A>(f: (s: string) => A) => (s: T): A => f(s)
export const value = (s: T) => {
  const id = <A>(a: A): A => a
  return apply(id)(s)
}
