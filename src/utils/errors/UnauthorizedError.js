const AppError = require('./AppError');

/**
 * @class
 * @description A custom error class for unauthorized access errors.
 * @extends AppError
 */
class UnauthorizedError extends AppError {
    /**
     * Creates an instance of UnauthorizedError.
     * @param {string} message - A descriptive error message.
     */
    constructor(message = 'Unauthorized access') {
        super(message, 401);
    }
}

module.exports = UnauthorizedError;
