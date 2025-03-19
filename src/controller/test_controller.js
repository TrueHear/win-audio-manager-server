const path = require('path');
const ValidationError = require('../utils/errors/ValidationError');
const { validationResult } = require("express-validator");
const AppError = require('../utils/errors/AppError');
const sanitizeHtml = require('sanitize-html');

/**
 * Controller class to handle operations related to test routes.
 * @class
 */
class TestController {
    /**
     * Handle GET requests for the test route.
     * 
     * This method provides a simple response to verify the test route.
     * 
     * @method
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} Sends a success response with a message.
     * 
     * @example
     * // Response example
     * {
     *   "status": true,
     *   "message": "Test route is working!"
     * }
     */
    static async getTest(req, res, next) {
        try {
            return res.status(200).json({
                status: true,
                message: 'win-audio-manager backend is working!',
            });
        } catch (error) {
            return next(error); // Pass the error to the global error handler;
        }
    }

    /**
     * Handle POST requests for the test route.
     * 
     * This method simulates data creation and logs the input data.
     * 
     * @method
     * @param {Object} req - Express request object.
     * @param {Object} req.body - The body of the request containing test data.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} Sends a response with the created data or an error.
     * 
     * @example
     * // Request body example
     * {
     *   "name": "SampleName",
     *   "value": 42
     * }
     * 
     * // Response example
     * {
     *   "status": true,
     *   "message": "Data received successfully",
     *   "data": {
     *     "name": "SampleName",
     *     "value": 42
     *   }
     * }
     */
    static async postTest(req, res, next) {
        try {
            // Validate the input
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: false,
                    message: 'Validation failed',
                    errors: errors.array(),
                });
            }

            // Extract and sanitize input data
            let { name, value } = req.body;

            name = sanitizeHtml(name, {
                allowedTags: [], // Disallow all HTML tags
                allowedAttributes: {},
            });

            value = sanitizeHtml(value.toString(), {
                allowedTags: [], // Disallow all HTML tags
                allowedAttributes: {},
            });

            console.log(`[Sanitized Input]`, { name, value });
            // If sanitized values are empty, throw a custom AppError
            if (!name || !value) {
                throw new AppError('Sanitized input is empty. Please provide valid data.', 400);
            }

            // Return the success response
            return res.status(201).json({
                status: true,
                message: 'Data received successfully',
                data: { name, value },
            });
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = TestController;
