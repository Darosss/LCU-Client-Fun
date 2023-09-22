import winston, { transports } from "winston";
import logform from "logform";
const { combine, timestamp, label, printf } = logform.format;

export const loggerData = winston.createLogger({
  level: "info",
  format: combine(
    timestamp(),
    printf((nfo) => {
      return `${nfo.timestamp} ${nfo.level}: ${JSON.stringify(nfo.message)}`;
    })
  ),
  transports: [
    new transports.File({ filename: "data-error.log", level: "error" }),
    new transports.File({ filename: "data-combined.log" }),
  ],
});

export const loggerWsEvents = winston.createLogger({
  level: "info",
  format: combine(
    timestamp(),
    printf((nfo) => {
      return `${nfo.timestamp} ${nfo.level}: ${JSON.stringify(nfo.message)}`;
    })
  ),
  transports: [
    new transports.File({ filename: "ws-errors.log", level: "error" }),
    new transports.File({ filename: "ws-combined.log" }),
  ],
});
