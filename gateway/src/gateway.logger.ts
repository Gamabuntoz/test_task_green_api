import { createLogger, format, transports } from 'winston';

export const gatewayLogger = createLogger({
  transports: [
    new transports.File({
      filename: 'gateway.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: 'gateway-error.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});
