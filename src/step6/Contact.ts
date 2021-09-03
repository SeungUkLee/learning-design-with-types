import type { Option, Branded } from '../utils';
import { none, some } from '../utils';
import * as EmailAddress from './EmailAddress';
import * as ZipCode from './ZipCode';
import * as StateCode from './StateCode';
import * as PersonalName from './PersonalName';

export type Contact = {
  name: PersonalName.T;
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

export const contactFromEmail = (name: PersonalName.T) => (emailStr: string): Option<Contact> => {
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

// -----
 
type PhoneContactInfo = string // dummy for now

type Email = Branded<EmailContactInfo, 'Email'>;
type PostalAddress2 = Branded<PostalContactInfo, 'PostalAddress2'>;
type HomePhone = Branded<PhoneContactInfo, 'HomePhone'>;
type WorkPhone = Branded<PhoneContactInfo, 'WorkPhone'>;


type ContactMethod =
  | Email
  | PostalAddress2
  | HomePhone
  | WorkPhone

type ContactInformation = {
  contactMethods: ContactMethod[];
}

export const printContactMethod = (cm: ContactMethod) => {
  switch (cm._tag) {
    case 'Email': {
      const { emailAddress } = cm;
      console.log("Email Address is ", emailAddress);
      break;
    }
    case 'PostalAddress2': {
      const { address } = cm;
      console.log("Postal Address is ", address);
      break;
    }
    case 'HomePhone': {
      console.log("Home Phone is ", cm);
      break;
    }
    case 'WorkPhone': {
      console.log("Work Phone is ", cm);
      break;
    }
  }
}

export const printReport = (contactInfo: ContactInformation) => {
  const { contactMethods } = contactInfo;
  for (const method of contactMethods) {
    printContactMethod(method)
  }
}

