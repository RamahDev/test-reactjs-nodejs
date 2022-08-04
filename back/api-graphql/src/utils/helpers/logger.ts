import { createLogger, format, transports } from 'winston';

const {
  combine, timestamp, label, printf,
} = format;

const loggerFormat = printf(({
  level, message, label: labelToDisplay, timestamp: timestampToDisplay,
}) => `${timestampToDisplay} [${labelToDisplay}] ${level}: ${message}`);

const logger = (instanceLabel: string) => createLogger({
  format: combine(
    format.splat(),
    label({ label: instanceLabel }),
    timestamp(),
    loggerFormat,
  ),
  transports: [new transports.Console()],
});

export default logger;
