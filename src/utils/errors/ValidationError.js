const AppError = require('./AppError');

/**
 * @class
 * @description A custom error class for validation-related errors.
 * @extends AppError
 */
class ValidationError extends AppError {
    /**
     * Creates an instance of ValidationError.
     * @param {string} message - A descriptive error message.
     * @param {Object} [details] - Additional validation error details.
     */
    constructor(message, details = {}) {
        super(message, 400);
        this.details = details; // Attach validation details if available
    }
}

module.exports = ValidationError;
