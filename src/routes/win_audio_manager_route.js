const express = require("express");
const { body } = require("express-validator");
const WinAudioManagerController = require("../controller/win_audio_manager_controller");


const router = express.Router();

/**
 * GET /api/audio/v1/list - Retrieve all available audio devices
 */
router.get("/list", WinAudioManagerController.listDevices);

/**
 * GET /api/audio/v1/default - Retrieve the current default playback device
 */
router.get("/default", WinAudioManagerController.getDefaultDevice);

/**
 * POST /api/audio/v1/set - Set a new default playback device with validation
 */
router.post(
    "/set",
    [
        // Validate and sanitize 'deviceIndex'
        body("deviceIndex")
            .notEmpty()
            .withMessage("Device index is required")
            .isInt({ min: 0 })
            .withMessage("Device index must be a positive integer"),
    ],
    WinAudioManagerController.setDefaultDevice
);

/**
 * POST /api/audio/v1/set-by-id - Set a new default playback device by device ID
 */
router.post(
    "/set-by-id",
    [
        body("deviceId")
            .notEmpty()
            .withMessage("Device ID is required")
            .isString()
            .withMessage("Device ID must be a string"),
    ],
    WinAudioManagerController.setDefaultDeviceById
);


module.exports = router;
