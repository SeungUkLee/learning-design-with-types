import { none } from '../utils';
import { contactFromEmail } from './Contact';

import * as StateCode from './StateCode';
import * as ZipCode from './ZipCode';

const name = { firstName: 'A', middleInitial: none, lastName: 'Smith' };
const contactOpt = contactFromEmail(name)("abc@example.com");

const state = StateCode.create("CA");
const zip = ZipCode.create("97210");

// ...
