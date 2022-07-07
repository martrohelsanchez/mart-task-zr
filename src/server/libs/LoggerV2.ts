import log4js, { Logger as log4jsLogger, getLogger } from 'log4js';

import config from 'src/server/config/config';
import log4jsConfig from 'src/server/config/log4js';

if (!config.IS_PROD) {
  log4js.configure(log4jsConfig);
}

export default class LoggerV2 {
  private logger: log4jsLogger;

  constructor(logType: string) {
    const { level } = config.LOGGING;

    this.logger = getLogger(logType);
    this.logger.level = level;
  }

  public debug(message: string, ...args: any[]): void {
    this.logger.debug(message, args);
  }

  public info(message: string, ...args: any[]): void {
    this.logger.info(message, args);
  }

  public warn(message: string, ...args: any[]): void {
    this.logger.warn(message, args);
  }

  public error(message: string, ...args: any[]): void {
    this.logger.error(message, args);
  }

  public child(options: Object) {
    return this.logger as any;
  }

  public getLoggerMiddleware() {
    return () => ({} as any);
  }
}

export interface ILogger {
  debug(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
}
