class ApiError extends Error {
  status;
  error;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthErr() {
    return new ApiError(401, "User isnt authorized");
  }
  static BadReq(message, errors = []) {
    return new ApiError(400, message, errors);
  }
}

export default ApiError;
