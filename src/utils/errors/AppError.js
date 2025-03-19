/**
 * @class
 * @description A base class for custom application errors.
 * @extends Error
 */
class AppError extends Error {
    /**
     * Creates an instance of AppError.
     * @param {string} message - A descriptive error message.
     * @param {number} statusCode - The HTTP status code associated with the error.
     * @param {boolean} [isOperational=true] - Indicates if the error is operational (handled gracefully).
     */
    constructor(message, statusCode, isOperational = true) {
        super(message); // Call the parent class (Error) constructor
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        // Capture the stack trace to exclude this constructor from the stack
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
