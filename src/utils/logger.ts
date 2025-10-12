/**
 * Centralized logging utility for consistent error and debug logging
 * across the application. Allows for easy configuration of log levels
 * and integration with external logging services.
 */

// Reserved for future use: configurable log levels
type _LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
	private isDevelopment: boolean;

	constructor() {
		this.isDevelopment = import.meta.env.DEV;
	}

	/**
	 * Log debug messages (only in development)
	 */
	debug(message: string, ...args: unknown[]): void {
		if (this.isDevelopment) {
			console.debug(`[DEBUG] ${message}`, ...args);
		}
	}

	/**
	 * Log informational messages
	 */
	info(message: string, ...args: unknown[]): void {
		console.info(`[INFO] ${message}`, ...args);
	}

	/**
	 * Log warning messages
	 */
	warn(message: string, ...args: unknown[]): void {
		console.warn(`[WARN] ${message}`, ...args);
	}

	/**
	 * Log error messages
	 */
	error(message: string, ...args: unknown[]): void {
		console.error(`[ERROR] ${message}`, ...args);
	}

	/**
	 * Log errors with context for better debugging
	 */
	logError(context: string, error: unknown, additionalData?: object): void {
		const errorMessage = error instanceof Error ? error.message : String(error);
		const errorStack = error instanceof Error ? error.stack : undefined;

		this.error(`${context}: ${errorMessage}`, {
			error: errorMessage,
			stack: errorStack,
			...additionalData
		});
	}
}

// Export singleton instance
export const logger = new Logger();
