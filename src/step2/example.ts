import * as EmailAddress from './EmailAddress'

const address1 = EmailAddress.create("test@test.com");
const address2 = EmailAddress.create("example.com");

switch(address1._tag) {
  case 'None': console.log('none'); break;
  case 'Some': {
    console.log(EmailAddress.value(address1.value));
    break;
  }
}

// console.log(address1)
// console.log(address2)
