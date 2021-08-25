interface Err<E> {
  readonly _tag: 'Err';
  readonly error: E;
}

interface Success<A> {
  readonly _tag: 'Success';
  readonly value: A;
}

export type Result<E, A> = Err<E> | Success<A>

export const err = <E = never, A = never>(e: E): Result<E, A> => ({ _tag: 'Err', error: e });
export const success = <E = never, A = never>(value: A): Result<E, A> => ({ _tag: 'Success', value });

