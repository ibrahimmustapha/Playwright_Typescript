type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG";

const LOG_LEVELS: Record<LogLevel, number> = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

const COLORS = {
  INFO: "\x1b[36m", // Cyan
  WARN: "\x1b[33m", // Yellow
  ERROR: "\x1b[31m", // Red
  DEBUG: "\x1b[35m", // Magenta
  RESET: "\x1b[0m",
};

class Logger {
  private minLevel: LogLevel = "INFO";

  setLevel(level: LogLevel) {
    this.minLevel = level;
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.minLevel];
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    data?: Record<string, unknown>,
  ): string {
    const timestamp = new Date().toLocaleTimeString();
    const color = COLORS[level];
    const reset = COLORS.RESET;

    let output = `${color}[${timestamp}] ${level}:${reset} ${message}`;

    if (data && Object.keys(data).length > 0) {
      const dataStr = JSON.stringify(data, null, 2);
      output += `\n${color}Data:${reset} ${dataStr}`;
    }

    return output;
  }

  info(message: string, data?: Record<string, unknown>) {
    if (this.shouldLog("INFO")) {
      console.log(this.formatMessage("INFO", message, data));
    }
  }

  warn(message: string, data?: Record<string, unknown>) {
    if (this.shouldLog("WARN")) {
      console.warn(this.formatMessage("WARN", message, data));
    }
  }

  error(message: string, data?: Record<string, unknown>) {
    if (this.shouldLog("ERROR")) {
      console.error(this.formatMessage("ERROR", message, data));
    }
  }

  debug(message: string, data?: Record<string, unknown>) {
    if (this.shouldLog("DEBUG")) {
      console.debug(this.formatMessage("DEBUG", message, data));
    }
  }
}

export const logger = new Logger();

// For backward compatibility, also export the old object-style if needed
export const oldLogger = {
  info: (message: string, data?: Record<string, unknown>) =>
    logger.info(message, data),
  warn: (message: string, data?: Record<string, unknown>) =>
    logger.warn(message, data),
  error: (message: string, data?: Record<string, unknown>) =>
    logger.error(message, data),
  debug: (message: string, data?: Record<string, unknown>) =>
    logger.debug(message, data),
};
