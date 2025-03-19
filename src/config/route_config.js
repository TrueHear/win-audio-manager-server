/**
 * API Configuration Array
 * 
 * This array holds the configuration details for setting up API endpoints
 * and their corresponding route handler files. It provides a centralized
 * place to define how different API endpoints map to their respective
 * route handlers in your application.
 */

const APIConfig = [
    {
        // The API endpoint for test-related operations.
        endpoint: '/api/test',

        // The relative path to the route handler file that contains the logic 
        // for handling requests to the /api/test_route endpoint.
        // Ensure this path is correct based on your project's folder structure.
        path: './routes/test_route',
    },
    {
        // The API endpoint for managing Windows audio devices.
        endpoint: "/api/audio/v1",

        // The relative path to the route handler file for audio management.
        path: "./routes/win_audio_manager_route",
    },
];

module.exports = APIConfig;