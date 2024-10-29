export class CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  budgetDayLength: number;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    profilePicture: string = '',
    budgetDayLength: number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.profilePicture = profilePicture;
    this.budgetDayLength = budgetDayLength;
  }
}
