class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal server error !! ";
  err.statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValues)} Entered`; // In MongoDB errors, the information about the conflicting keys is typically contained within "err.keyPattern" or "err.keyValue"
  }
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again!`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, Try again!`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}`,
      err = new ErrorHandler(message, 400);
  }

  const errorMessage = err.errors // this "errors" property is comes from Mongoose validation library
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
    : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};
export default ErrorHandler;
