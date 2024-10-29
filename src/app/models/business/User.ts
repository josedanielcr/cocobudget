import {BaseClass} from './BaseClass';

export class User extends BaseClass {
  id : string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  budgetDayLength: number;

  constructor(
    id : string,
    firstName: string,
    lastName: string,
    email: string,
    profilePicture: string = '',
    budgetDayLength: number,
  ) {
    super();  // Call to the base class constructor
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.profilePicture = profilePicture;
    this.budgetDayLength = budgetDayLength;
  }
}
