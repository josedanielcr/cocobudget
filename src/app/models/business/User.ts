import {BaseClass} from './BaseClass';

export class User extends BaseClass {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  isVerified: boolean;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    profilePicture: string = '',
    isVerified: boolean = false
  ) {
    super();  // Call to the base class constructor
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.profilePicture = profilePicture;
    this.isVerified = isVerified;
  }
}
