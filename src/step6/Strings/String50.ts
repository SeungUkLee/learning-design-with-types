import type { Branded, Option } from '../../utils'
import { some, none } from '../../utils'

type String50 = Branded<string, 'String100'>

export type T = String50;

const isString50 = (s: string): s is String50 => s.length <= 50;

export const create = (s: string): Option<T> => {
  return isString50(s) ? some(s) : none
}

export const apply = <A>(f: (s: string) => A) => (s: T): A => f(s)
export const value = (s: T) => {
  const id = <A>(a: A): A => a
  return apply(id)(s)
}
