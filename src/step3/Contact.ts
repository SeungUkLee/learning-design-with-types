import type { Option, Branded } from '../utils';
import { none, some } from '../utils';
import * as EmailAddress from './EmailAddress';
import * as ZipCode from './ZipCode';
import * as StateCode from './StateCode';

export type Contact = {
  name: PersonalName;
  contactInfo: ContactInfo;
}

type ContactInfo =
  | EmailOnly
  | PostOnly
  | EmailAndPost

const EmailOnly = (emailContactInfo: EmailContactInfo) => {
  return emailContactInfo as ContactInfo 
}

const EmailAndPost = (emailContactInfo: EmailContactInfo, postalContactInfo: PostalContactInfo) => {
  return { emailContactInfo, postalContactInfo } as ContactInfo 
}

const PostOnly = (postalContactInfo: PostalContactInfo) => {
  return postalContactInfo as ContactInfo 
}

type EmailOnly = Branded<EmailContactInfo, 'EmailOnly'>;
type PostOnly = Branded<PostalContactInfo, 'PostOnly'>;
type EmailAndPost = Branded<{
  emailContactInfo: EmailContactInfo;
  postalContactInfo: PostalContactInfo;
}, 'EmailAndPost'>

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

export const contactFromEmail = (name: PersonalName) => (emailStr: string): Option<Contact> => {
  const emailOpt = EmailAddress.create(emailStr)
  switch(emailOpt._tag) {
    case 'Some': { 
      const email = emailOpt.value;
      const emailContactInfo: EmailContactInfo = {
        emailAddress: email,
        isEmailVerified: false
      }
      const contactInfo = EmailOnly(emailContactInfo)

      return some({ name, contactInfo })
    }
    case 'None': return none;
  }
}

export const updatePostalAddress = (contact: Contact) => (newPostalAddress: PostalContactInfo): Contact => {
  const { name, contactInfo } = contact;

  let newContactInfo: ContactInfo;
  switch (contactInfo._tag) {
    case 'EmailOnly': {
      newContactInfo = EmailAndPost(contactInfo, newPostalAddress)
      break;
    }
    case 'PostOnly': {
      newContactInfo = PostOnly(newPostalAddress)
      break;
    }
    case 'EmailAndPost': {
      const emailContactInfo = contactInfo.emailContactInfo
      newContactInfo = EmailAndPost(emailContactInfo, newPostalAddress)
      break;
    }
  }

  return { name, contactInfo: newContactInfo }
}

