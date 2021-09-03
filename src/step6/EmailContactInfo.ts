import type { Branded } from '../utils';

// placeholder
type EmailAddress = string

// UnverifiedData = just the email
type UnverifiedData = EmailAddress

type VerifiedData = [EmailAddress, Date];

type UnverifiedState = Branded<UnverifiedData, 'UnverfiedState'>;
type VerifiedState = Branded<VerifiedData, 'VerfiedState'>;

const UnverfiedState = (email: UnverifiedData): T => {
  return email as T
}
const VerfiedState = (v: VerifiedData): T => {
  return v as T
}

export type T =
  | UnverifiedState
  | VerifiedState


export const create = (email: UnverifiedData) => {
  return UnverfiedState(email)
}

export const verified = (emailContactInfo: T) => (dateVerified: Date): T => {
  switch (emailContactInfo._tag) {
    case 'UnverfiedState': {
      return VerfiedState([emailContactInfo, dateVerified])
    }
    case 'VerfiedState': {
      return emailContactInfo;
    }
  }
}

export const sendVerificationEmail = (emailContactInfo: T): void => {
  switch (emailContactInfo._tag) {
    case 'UnverfiedState': {
      // send email
      console.log("sending email");
      break;
    }
    case 'VerfiedState': {
      // do nothing
      break;
    }
  }
}

export const sendPasswordReset = (emailContactInfo: T): void => {
  switch (emailContactInfo._tag) {
    case 'UnverfiedState': { 
      // ignore
      break;
    }
    case 'VerfiedState': {
      // ignore
      console.log("sending password reset");
      break;
    }
  }
}
