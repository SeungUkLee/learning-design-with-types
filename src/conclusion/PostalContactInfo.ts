import type { Branded } from '../utils';
import * as PostalAddress from './PostalAddress';

/** PostalContactInfo -- state machine */

// InvalidData = just the PostalAddress.
type InvalidData = PostalAddress.T;

// ValidData = PostalAddress plus the time it was verified.
type ValidData = [PostalAddress.T, Date];

type InvalidState = Branded<InvalidData, 'InvalidState'>;
type ValidState = Branded<ValidData, 'ValidState'>;

// data constructors
// TODO:
const InvalidState = (postalAddress: InvalidData) => ({ data: postalAddress }) as T;
const ValidState = (postalAddress: ValidData) => postalAddress as T;

// set of states
export type T =
  | InvalidState
  | ValidState;

// invalid on creation
export const create = (address: PostalAddress.T) => InvalidState(address);

// handle the "validated" event
export const validated = (postalContactInfo: T) => (dateValidated: Date) => {
  switch(postalContactInfo._tag) {
    case 'InvalidState': {
      const address = postalContactInfo.data;
      // construct a new info in the valid state
      return ValidState([address, dateValidated]);
    }
    case 'ValidState': {
      // ignore
      return postalContactInfo
    }
  }
}

export const contactValidationService = (postalContactInfo: T) => {
  // TODO:
  const dateIsTooLongAgo = (d: Date) => {
    const now = new Date();
    return Number(d) < now.setFullYear(now.getFullYear() - 1);
  }

  switch(postalContactInfo._tag) {
    case 'InvalidState': {
      console.log("contacting the address validation service")
      break;
    }
    case 'ValidState': {
      const address = postalContactInfo[0];
      const date = postalContactInfo[1];
      if (dateIsTooLongAgo(date)) {
        console.log("last checked a long time ago.");
        console.log("contacting the address validation service again");
      } else {
        console.log("recently checked. Doing nothing.")
      }
    }
  }
}
