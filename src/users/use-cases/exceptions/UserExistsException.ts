export class UserExistsException extends Error {
  constructor() {
    super("There's already an user with the given e-mail");
    this.name = 'UserExistsException';
  }
}
