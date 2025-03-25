/**
 * @fileoverview CLI utility to parse flags and optionally prompt the user for IP/Port.
 * Supports:
 * - Flags: --ip, --port, --default
 * - Interactive fallback if no valid flags passed
 */

const readline = require('readline');
const config = require('../../app-config.json');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

/**
 * Validates if the provided string is a valid IPv4 address.
 * 
 * @param {string} ip - The IP address string to validate.
 * @returns {boolean} `true` if valid IPv4, `false` otherwise.
 */
function isValidIP(ip) {
    const ipv4Regex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
    return ipv4Regex.test(ip);
}

/**
 * Validates if the provided string is a valid port number (1-65535).
 * 
 * @param {string} port - The port number string to validate.
 * @returns {boolean} `true` if valid port, `false` otherwise.
 */
function isValidPort(port) {
    const portNum = parseInt(port, 10);
    return !isNaN(portNum) && portNum > 0 && portNum <= 65535;
}

/**
 * Prompts the user via command-line to optionally configure the IP and Port manually.
 * Falls back to values from config file or hardcoded defaults if skipped or invalid.
 * 
 * @async
 * @function getUserConfig
 * @returns {Promise<{ ip: string, port: number }>} Resolves with the selected or default IP and port.
 */
async function promptForConfig() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question("[✅] Do you want to manually configure IP and Port? (y/N): ", (answer) => {
            if (answer.trim().toLowerCase() === 'y') {
                // Ask for IP
                rl.question("[✅] Enter IP (default: 127.0.0.1): ", (ipInput) => {
                    // Ask for Port
                    rl.question("[✅] Enter Port (default: 8009): ", (portInput) => {
                        rl.close();

                        const ip = ipInput.trim();
                        const port = portInput.trim();

                        // Fallbacks and validation
                        const finalIP = isValidIP(ip) ? ip : (config.IP || "127.0.0.1");
                        const finalPort = isValidPort(port) ? parseInt(port) : (config.PORT || 8009);

                        // Warnings if user input was invalid
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
                // User declined manual input, use config/defaults
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
 * Pauses execution and waits for the user to press Enter before exiting.
 * Useful for graceful shutdowns or pausing on errors.
 * 
 * @function waitForExit
 * @returns {void}
 */
function waitForExit() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("\n[✅] Press Enter to exit...", () => {
        rl.close();
        process.exit(1); // Exit with failure code
    });
}


/**
 * Parses CLI arguments and returns the selected or default IP/Port.
 * Supports:
 * --ip        Manual IP
 * --port      Manual Port
 * --default   Use config/default without prompt
 * --help      Show help
 *
 * @returns {Promise<{ ip: string, port: number }>}
 */
async function getUserConfig() {
    const argv = yargs(hideBin(process.argv))
        .option('ip', {
            alias: 'i',
            describe: 'Manually specify IP address',
            type: 'string'
        })
        .option('port', {
            alias: 'p',
            describe: 'Manually specify Port number',
            type: 'number'
        })
        .option('default', {
            alias: 'd',
            describe: 'Use default configuration without prompting',
            type: 'boolean'
        })
        .help('help')
        .alias('help', 'h')
        .usage(`
Usage:
  $ node index.js [options]

Options:
  --ip, -i       IP address to bind the server to
  --port, -p     Port number to run the server on
  --default, -d  Skip prompts and use default values
  --help, -h     Show this help message
        `)
        .argv;

    // Flag-only mode (skip prompts)
    if (argv.default) {
        return {
            ip: config.IP || "127.0.0.1",
            port: config.PORT || 8009
        };
    }

    // If valid CLI args provided, use them
    if (argv.ip && argv.port && isValidIP(argv.ip) && isValidPort(argv.port)) {
        return {
            ip: argv.ip,
            port: parseInt(argv.port)
        };
    }

    // Else, fallback to interactive prompt
    return await promptForConfig();
}

/**
 * Gracefully waits for user to press enter before exiting.
 * Useful for allowing error messages to be seen.
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


// Export both utilities
module.exports = {
    getUserConfig,
    waitForExit
};
