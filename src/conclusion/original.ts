type Contact = {
  firstName: string;
  middleInitial: string;
  lastName: string;

  emailAddress: string;
  //true if ownership of email address is confirmed
  isEmailVerified: boolean;

  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  //true if validated against address service
  isAddressValid: boolean;
}
