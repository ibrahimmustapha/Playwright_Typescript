type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG";

function log(level: LogLevel, message: string, data?: Record<string, unknown>) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...data,
  };

  console.log(JSON.stringify(entry));
}

export const logger = {
  info: (message: string, data?: Record<string, unknown>) =>
    log("INFO", message, data),

  warn: (message: string, data?: Record<string, unknown>) =>
    log("WARN", message, data),

  error: (message: string, data?: Record<string, unknown>) =>
    log("ERROR", message, data),

  debug: (message: string, data?: Record<string, unknown>) =>
    log("DEBUG", message, data),
};
