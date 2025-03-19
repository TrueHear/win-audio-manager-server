
const express = require('express');
const { body } = require('express-validator');
const TestController = require('../controller/test_controller');

const router = express.Router();

/**
 * GET /api/test
 */
router.get('/', TestController.getTest);

/**
 * POST /api/test with inline validation and sanitization
 */
router.post(
    '/',
    [
        // Validate and sanitize 'name'
        body('name')
            .trim()
            .notEmpty()
            .withMessage('Name is required')
            .isLength({ min: 2 })
            .withMessage('Name must be at least 2 characters long'),

        // Validate and sanitize 'value'
        body('value')
            .notEmpty()
            .withMessage('Value is required')
            .isNumeric()
            .withMessage('Value must be a number'),
    ],
    TestController.postTest
);

module.exports = router;
