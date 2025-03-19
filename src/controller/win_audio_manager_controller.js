const { listAudioDevices, getDefaultPlaybackDevice, setAudioDevice } = require("win-audio-manager");
const { validationResult } = require("express-validator");
const AppError = require("../utils/errors/AppError");

/**
 * Controller for managing Windows audio devices.
 * Provides API endpoints to list devices, get the default device, and set a default device.
 * @class
 */
class WinAudioManagerController {
    /**
     * Get a list of available audio devices.
     * 
     * @method
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} Sends a response with the list of devices.
     * 
     * @example
     * // Response example:
     * {
     *   "status": true,
     *   "message": "Audio devices retrieved successfully",
     *   "data": [
     *     { "Name": "Speakers", "Index": 0 },
     *     { "Name": "Headphones", "Index": 1 }
     *   ]
     * }
     */
    static async listDevices(req, res, next) {
        try {
            const devices = await listAudioDevices();
            return res.status(200).json({
                status: true,
                message: "Audio devices retrieved successfully",
                data: devices,
            });
        } catch (error) {
            return next(new AppError(`Error retrieving audio devices: ${error.message}`, 500));
        }
    }

    /**
     * Get the current default playback device.
     * 
     * @method
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} Sends a response with the default playback device.
     * 
     * @example
     * // Response example:
     * {
     *   "status": true,
     *   "message": "Default playback device retrieved",
     *   "data": { "Name": "Headphones", "Index": 1 }
     * }
     */
    static async getDefaultDevice(req, res, next) {
        try {
            const defaultDevice = await getDefaultPlaybackDevice();
            return res.status(200).json({
                status: true,
                message: "Default playback device retrieved",
                data: defaultDevice,
            });
        } catch (error) {
            return next(new AppError(`Error retrieving default playback device: ${error.message}`, 500));
        }
    }

    /**
     * Set a new default playback device by index.
     * 
     * @method
     * @param {Object} req - Express request object.
     * @param {Object} req.body - The body of the request containing the device index.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} Sends a response confirming the change or an error message.
     * 
     * @example
     * // Request body example:
     * {
     *   "deviceIndex": 1
     * }
     * 
     * // Response example:
     * {
     *   "status": true,
     *   "message": "Default playback device set successfully",
     *   "data": { "Index": 1 }
     * }
     */
    static async setDefaultDevice(req, res, next) {
        try {
            // Validate request input
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: false,
                    message: "Validation failed",
                    errors: errors.array(),
                });
            }

            const { deviceIndex } = req.body;
            if (typeof deviceIndex !== "number") {
                throw new AppError("Invalid device index provided.", 400);
            }

            await setAudioDevice(deviceIndex);

            return res.status(200).json({
                status: true,
                message: "Default playback device set successfully",
                data: { Index: deviceIndex },
            });
        } catch (error) {
            return next(new AppError(`Error setting default playback device: ${error.message}`, 500));
        }
    }
}

module.exports = WinAudioManagerController;
