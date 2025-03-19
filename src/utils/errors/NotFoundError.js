const AppError = require('./AppError');

/**
 * @class
 * @description A custom error class for handling "Not Found" errors.
 * @extends AppError
 */
class NotFoundError extends AppError {
    /**
     * Creates an instance of NotFoundError.
     * @param {string} message - A descriptive error message.
     */
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}

module.exports = NotFoundError;
