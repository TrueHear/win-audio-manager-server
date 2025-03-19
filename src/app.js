const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require("morgan");
const APIConfig = require('./config/route_config');
const AppError = require('./utils/errors/AppError');


/**
 * Sets up middleware for parsing JSON bodies in incoming requests.
 * Ensures `req.body` is populated with parsed JSON data.
 */
app.use(express.json());

/**
 * Enables Cross-Origin Resource Sharing (CORS) for all origins, allowing
 * any client to make requests to this server. Adjust in production for stricter policies.
 */
app.use(cors({ origin: "*" }));


/**
 * Morgan for loggin into console
 */
app.use(morgan('combined'));


// Middleware to log each request using Winston
app.use((req, res, next) => {
    // logger.info(`HTTP Request: ${req.method} ${req.url}`);
    next();
});


/**
 * Load and mount all API routes as defined in APIConfig.
 * APIConfig is expected to be an array of objects, each specifying:
 * - endpoint: the URL path for the route
 * - path: the path to the route's module/file
 * 
 * Example entry in APIConfig:
 * { endpoint: '/users', path: './Routes/UserRoutes.js' }
 */
APIConfig.map((api) => {
    try {
        app.use(api.endpoint, require(api.path));
        return console.info(`[✅] API ENDPOINT:${api.endpoint} Registered`);
    } catch (error) {
        console.error(`[❌] Error occurred While Registering API endpoints:`, error.message);
        return;
    }
});


/**
 * Global Error Handling Middleware:
 * Catches any errors that bubble up through the middleware chain.
 * Logs the error and returns a generic 500 Internal Server Error response.
 * This prevents stack traces or sensitive information from leaking in production.
 * 
 * @function
 * @param {Error} err - The error object thrown by previous middleware or routes.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 */
app.use((err, req, res, next) => {
    console.warn(`[❌] Error Stack ....`, err.message);
    console.error(err.stack);
    console.error(`[❌] Error occurred on ${req.method} ${req.url} - ${err.message}`);
    console.error(`[❌] Error occurred on ${req.method} ${req.url} - ${err.message}`);

    // Handle AppError (custom errors)
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: false,
            message: err.message,
        });
    }

    return res.status(500).json({ status: false, message: 'Internal Server Error' });
});

module.exports = app;