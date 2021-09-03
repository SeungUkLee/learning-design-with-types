import type { Branded } from '../utils';
import * as WrappedString from './WrappedString';
import * as StateCode from './StateCode';
import * as ZipCode from './ZipCode';

type USPostalAddress = Branded<{
  address1: WrappedString.String50;
  address2: WrappedString.String50;
  city: WrappedString.String50;
  state: StateCode.T;
  zip: ZipCode.T;
}, 'USPostalAddress'>

type UKPostalAddress = Branded<{
  address1: WrappedString.String50;
  address2: WrappedString.String50;
  town: WrappedString.String50;
  postCode: WrappedString.String50;
}, 'UKPostalAddress'>

type GenericPostalAddress = Branded<{
  address1: WrappedString.String50;
  address2: WrappedString.String50;
  address3: WrappedString.String50;
  address4: WrappedString.String50;
  address5: WrappedString.String50;
}, 'GenericPostalAddress'>

export type T = 
  | USPostalAddress
  | UKPostalAddress
  | GenericPostalAddress

// data constructors
export const USPostalAddress = (postalAddress: {
  address1: WrappedString.String50;
  address2: WrappedString.String50;
  city: WrappedString.String50;
  state: StateCode.T;
  zip: ZipCode.T;
}) => postalAddress as T;

export const UKPostalAddress = (postalAddress: {
  address1: WrappedString.String50;
  address2: WrappedString.String50;
  town: WrappedString.String50;
  postCode: WrappedString.String50;
}) => postalAddress as T;

export const GenericPostalAddress = (postalAddress: {
  address1: WrappedString.String50;
  address2: WrappedString.String50;
  address3: WrappedString.String50;
  address4: WrappedString.String50;
  address5: WrappedString.String50;
}) => postalAddress as T;

