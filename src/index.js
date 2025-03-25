/**
 * @fileoverview Entry point for the Node.js application. This file:
 * - Loads configs variables.
 */

const app = require("./app");
const config = require('./app-config.json');
const http = require('http');
const readline = require('readline');
const { getUserConfig, waitForExit } = require("./utils/cli-utils/cli-utils");




/**
 * The main initialization function for the application. It:
 * 1. Connects to the MongoDB database using the provided DB URL.
 * 2. Loads all Mongoose models after ensuring a successful DB connection.
 * 3. Depending on the environment starts :
 *    - An HTTP server .
 * 
 * @async
 * @function main
 * @returns {Promise<void>} Returns a promise that resolves once the server is running or rejects if there's an error.
 * @throws Will log and exit the process if the database connection fails.
 */
async function main() {
    try {
        // Determine the port and environment settings
        // const PORT = config.PORT || 8009;
        // Determine the ip to run it on
        // const IP = config.IP || "127.0.0.1";
        const { ip: IP, port: PORT } = await getUserConfig();
        /**
         * Create and start an HTTP server in development mode.
         * The server listens on the specified PORT.
         */
        const server = http.createServer(app);
        // Increase max listeners for this server only
        server.setMaxListeners(8);
        server.listen(PORT, IP, () => {
            console.log(`[✅] HTTP Server running in development mode on port http://${IP}:${PORT}`);
        });
        /* Export HTTP server */
        module.exports = server;



    } catch (error) {
        // If an error occurs (most likely during DB connection), we log the error message
        // and exit the process to ensure the application doesn't run in a non-functional state.        
        console.log(`[❌] Error While Running main:`, error.message);
        await waitForExit();
        // process.exit(1); // Exit the process if the database connection fails
    }
}

main();