import { Response } from "express";
// MY OWN ATTEMPT:
// ===============================
/* var winston = require("winston"),
  expressWinston = require("express-winston");

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/all.log" })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute: function(req: any, res: Response) {
    return false;
  } // optional: allows to skip some log messages based on request and/or response
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log" })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}); */
// =============================

import winston from "winston";
import * as expressWinston from "express-winston";
import path from "path";

let requestLoggerTransports: Array<any> = [
  new winston.transports.File({
    filename: path.join(process.cwd(), "logs", "request.log")
  })
];
let errorLoggerTransports: Array<any> = [
  new winston.transports.File({
    filename: path.join(process.cwd(), "logs", "error.log")
  })
];
if (process.env.NODE_ENV !== "production") {
  //requestLoggerTransports.push(new winston.transports.Console());
  errorLoggerTransports.push(new winston.transports.Console());
}
let requestLogger = expressWinston.logger({
  transports: requestLoggerTransports,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  expressFormat: true,
  colorize: false
});

let errorLogger = expressWinston.errorLogger({
  transports: errorLoggerTransports,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
});

export { requestLogger, errorLogger };
