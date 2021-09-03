import type { Branded } from '../utils';
import * as PersonalName from './PersonalName';
import * as EmailContactInfo from './EmailContactInfo';
import * as PostalContactInfo from './PostalContactInfo';

type Email = Branded<EmailContactInfo.T, 'Email'>;
type PostalAddress = Branded<PostalContactInfo.T, 'PostalContactInfo'>;

type ContactMethod = 
  | Email
  | PostalAddress

export type Contact = {
  name: PersonalName.T;
  primaryContactMethod: ContactMethod;
  secondContactMethods: ContactMethod[];
}

