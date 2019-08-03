const winston = require("winston");
const { format } = require("winston");
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

winston.configure({
  transports: [new winston.transports.File({ filename: "server.log" })],
  format: combine(label({ label: "right meow!" }), timestamp(), myFormat)
});

module.exports = winston;
