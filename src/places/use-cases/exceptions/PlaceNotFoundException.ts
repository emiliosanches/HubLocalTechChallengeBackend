export class PlaceNotFoundException extends Error {
  constructor() {
    super("No place was found with the given id");
    this.name = "PlaceNotFoundException";
  }
}