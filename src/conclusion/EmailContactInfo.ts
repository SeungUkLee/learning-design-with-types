import type { Branded } from '../utils';
import * as EmailAddress from './EmailAddress';

/** EmailContactInfo -- state machine */

// UnverifiedData = just the EmailAddress.
type UnverifiedData = EmailAddress.T
// VerifiedData = EmailAddress plus the time it was verifed.
type VerifiedData = [EmailAddress.T, Date];

type UnverifiedState = Branded<UnverifiedData, 'UnverifiedState'>;
type VerifiedState = Branded<VerifiedData, 'VerifiedState'>;

// data constructors
export const UnverifiedState = (email: UnverifiedData): T => email as T;
export const VerifiedState = (v: VerifiedData): T => v as T;

// set of states
export type T =
  | UnverifiedState
  | VerifiedState


// unverified on creation.
export const create = (email: UnverifiedData) => UnverifiedState(email);

// handle the "verified" event
export const verified = (emailContactInfo: T) => (dateVerified: Date): T => {
  switch (emailContactInfo._tag) {
    case 'UnverifiedState': {
      // construct a new info in the verified state.
      return VerifiedState([emailContactInfo, dateVerified])
    }
    case 'VerifiedState': {
      // ignore
      return emailContactInfo;
    }
  }
}

export const sendVerificationEmail = (emailContactInfo: T): void => {
  switch (emailContactInfo._tag) {
    case 'UnverifiedState': {
      // send email
      console.log("sending email");
      break;
    }
    case 'VerifiedState': {
      // do nothing
      break;
    }
  }
}

export const sendPasswordReset = (emailContactInfo: T): void => {
  switch (emailContactInfo._tag) {
    case 'UnverifiedState': { 
      // ignore
      break;
    }
    case 'VerifiedState': {
      // ignore
      console.log("sending password reset");
      break;
    }
  }
}
