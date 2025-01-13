class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode
        // to check error stack property
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;