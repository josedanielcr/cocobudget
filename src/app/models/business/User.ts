import {BaseClass} from './BaseClass';

export class User extends BaseClass {
  id : string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  isVerified: boolean;

  constructor(
    id : string,
    firstName: string,
    lastName: string,
    email: string,
    profilePicture: string = '',
    isVerified: boolean = false
  ) {
    super();  // Call to the base class constructor
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.profilePicture = profilePicture;
    this.isVerified = isVerified;
  }
}
