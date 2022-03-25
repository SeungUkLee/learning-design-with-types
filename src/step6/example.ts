import { String2 } from './Strings';

import * as StateCode from './StateCode';
import * as ZipCode from './ZipCode';
import * as WrappedString from './WrappedString';

const state = StateCode.create("CA");
const zip = ZipCode.create("97210");

// ...

const s2good = String2.create("CA")
const s2bed = String2.create("California");

// ----

const s = WrappedString.string50("abc");
const s2 = WrappedString.string100("abc");

if (s._tag === 'Some' && s2._tag === 'Some') {
  const s50 = s.value;
  const s100 = s2.value;
  console.log('s100 is ', s100);

  // equality using module function is true
  console.log("s50 is equal to s100 using module equals? ", WrappedString.equals(s50)(s100))
}

const s3 = WrappedString.string50("abc");
const s4 = WrappedString.string100("def");
const s5 = WrappedString.string100("xyz");

if (s3._tag === 'Some' && s4._tag === 'Some' && s5._tag === 'Some') {
  const abc = s3.value;
  const def = s4.value;
  const xyz = s5.value;

  // const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
  const pipe = <A, B, C>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C
  ): C => bc(ab(a))

  const map = pipe(
    new Map(),
    WrappedString.mapAdd(abc)('value for abc'),
    WrappedString.mapAdd(def)('value for def'),
  )

  console.log("Found abc in map? ", WrappedString.mapTryFind(abc)(map))
  console.log("Found xyz in map? ", WrappedString.mapTryFind(xyz)(map))
}

