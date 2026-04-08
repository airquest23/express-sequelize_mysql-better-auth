import path from 'path';
import winston from 'winston';
import 'winston-daily-rotate-file';
const { combine, timestamp, json, errors, printf, colorize } = winston.format;

/////////////////////////////////////
/* LOG LEVELS
{
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
}
*/

/////////////////////////////////////
const errorFilter = winston.format((info, opts) => {
  return info.level === 'error' ? info : false;
});

const warnFilter = winston.format((info, opts) => {
  return info.level === 'warn' ? info : false;
});

const infoFilter = winston.format((info, opts) => {
  return info.level === 'info' ? info : false;
});

const httpFilter = winston.format((info, opts) => {
  return info.level === 'http' ? info : false;
});

/////////////////////////////////////
const logger = winston.createLogger({
  handleExceptions: true,
  handleRejections: true,

  transports: [
    /////////////////////////////////////
    // Console logging
    new winston.transports.Console({
      level: process.env.LOG_LEVEL || 'http',
      format: combine(
        //timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
        colorize({ level: true, message: true }),
        errors({ stack: true }),
        printf(({ /*timestamp,*/ level, message, ...meta }) => {
          if (meta && Object.entries(meta).length > 0)
            return `${level}: ${message}\n${JSON.stringify(meta, null, 2)}`;
          else
            return `${level}: ${message}`;
        }),
      ),
    }),

    /////////////////////////////////////
    // Error file logging
    new winston.transports.DailyRotateFile({
      level: 'error',
      filename: path.join(__dirname, process.env.LOG_PATH || '../../logs', 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      format: combine(
        errorFilter(),
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
        json({ space: 2 }),
        errors({ stack: true }),
      ),
    }),

    /////////////////////////////////////
    // Warn file logging
    new winston.transports.DailyRotateFile({
      level: 'warn',
      filename: path.join(__dirname, process.env.LOG_PATH || '../../logs', 'warn-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      format: combine(
        warnFilter(),
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
        json({ space: 2 }),
      ),
    }),

    /////////////////////////////////////
    // Info file logging
    new winston.transports.DailyRotateFile({
      level: 'info',
      filename: path.join(__dirname, process.env.LOG_PATH || '../../logs', 'info-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      format: combine(
        infoFilter(),
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
        json({ space: 2 }),
      ),
    }),

    /////////////////////////////////////
    // Http file logging
    new winston.transports.DailyRotateFile({
      level: 'http',
      filename: path.join(__dirname, process.env.LOG_PATH || '../../logs', 'http-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      format: combine(
        httpFilter(),
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
        json({ space: 2 }),
      ),
    }),

    /////////////////////////////////////
    // General file logging
    new winston.transports.DailyRotateFile({
      level: 'http',
      filename: path.join(__dirname, process.env.LOG_PATH || '../../logs', 'combined-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      format: combine(
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
        json({ space: 2 }),
        errors({ stack: true }),
      ),
    }),
  ],
});

export default logger;