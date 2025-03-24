/**
 * @fileoverview Entry point for the Node.js application. This file:
 * - Loads configs variables.
 */

const app = require("./app");
const config = require('./app-config.json');
const http = require('http');
const readline = require('readline');


/**
 * Prompts the user for manual input of IP and port.
 * Falls back to default if user declines or input is empty/invalid.
 */
function getUserConfig() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    const isValidIP = (ip) => {
        const ipv4Regex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
        return ipv4Regex.test(ip);
    };

    const isValidPort = (port) => {
        const portNum = parseInt(port, 10);
        return !isNaN(portNum) && portNum > 0 && portNum <= 65535;
    };

    return new Promise((resolve) => {
        rl.question("[✅] Do you want to manually configure IP and Port? (y/N): ", (answer) => {
            if (answer.trim().toLowerCase() === 'y') {
                rl.question("[✅] Enter IP (default: 127.0.0.1): ", (ipInput) => {
                    rl.question("[✅] Enter Port (default: 8009): ", (portInput) => {
                        rl.close();

                        const ip = ipInput.trim();
                        const port = portInput.trim();

                        const finalIP = isValidIP(ip) ? ip : (config.IP || "127.0.0.1");
                        const finalPort = isValidPort(port) ? parseInt(port) : (config.PORT || 8009);

                        if (!isValidIP(ip) && ip) {
                            console.log(`[⚠️] Invalid IP entered. Falling back to default: ${finalIP}`);
                        }

                        if (!isValidPort(port) && port) {
                            console.log(`[⚠️] Invalid Port entered. Falling back to default: ${finalPort}`);
                        }

                        resolve({ ip: finalIP, port: finalPort });
                    });
                });
            } else {
                rl.close();
                resolve({
                    ip: config.IP || "127.0.0.1",
                    port: config.PORT || 3333
                });
            }
        });
    });
}



/**
 * Waits for user to press Enter before exiting (used on errors).
 */
function waitForExit() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("\n[✅] Press Enter to exit...", () => {
        rl.close();
        process.exit(1);
    });
}

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