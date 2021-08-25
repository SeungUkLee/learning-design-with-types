import type { Option } from '../utils';
import * as EmailAddress from './EmailAddress';
import * as ZipCode from './ZipCode';
import * as StateCode from './StateCode';

export type Contact = {
  name: PersonalName;
  emailContactInfo: EmailContactInfo;
  postalContactInfo: PostalContactInfo;
}

type PersonalName = {
  firstName: string;
  middleInitial: Option<string>;
  lastName: string;
}

type EmailContactInfo = {
  emailAddress: EmailAddress.T;
  isEmailVerified: boolean;
}

type PostalAddress = {
  address: string;
  city: string;
  state: StateCode.T;
  zip: ZipCode.T;
}

type PostalContactInfo = {
  address: PostalAddress;
  isAddressValid: boolean;
}

