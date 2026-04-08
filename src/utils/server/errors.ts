import { Response } from "express";
import { statusCodes as sc } from "./status-codes";
import logger from "../logger";

export function handleError(e: unknown, res: Response) {
  logger.error(e);

  if (e instanceof ErrorServer) {
    return res
      .status(e.code)
      .json({
        error: e.message,
        code: e.code
      });
  }
  
  else if (e instanceof Error) {
    return res
      .status(sc["500-Internal-Server-Error"].code)
      .json({
        error: e.message,
        code: sc["500-Internal-Server-Error"].code
      });
  }
  
  else {
    return res
      .status(sc["500-Internal-Server-Error"].code)
      .json({
        error: "Unknown error",
        code: sc["500-Internal-Server-Error"].code
      });
  };
};

/**
 * Custom error class for application-specific errors.
 * Extends the built-in Error class.
 */
export class ErrorServer extends Error {
  code: number;
  details: any;

  /**
   * @param {string} message - Error message
   * @param {number} code - HTTP status code or custom error code
   * @param {any} [details] - Optional extra error details
   */
  constructor(message: string, code: number = 500, details: any = null) {
    super(message);

    // Maintains proper stack trace (only works in V8 engines like Node.js)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    };

    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
  };
};