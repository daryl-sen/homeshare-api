export class ErrorLoggingService {
  constructor(e: unknown) {
    this.handleError(e);
  }

  private handleError(e: unknown) {
    // TODO: Add proper error logging
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log(e);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~");
  }
}
