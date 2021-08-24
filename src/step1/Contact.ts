import type { Option } from '../utils';

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
  emailAddress: string;
  isEmailVerified: boolean;
}

type PostalAddress = {
  address: string;
  city: string;
  state: string;
  zip: string;
}

type PostalContactInfo = {
  address: PostalAddress;
  isAddressValid: boolean;
}

