import log4js, { levels } from 'log4js';
import { app } from 'electron';
import { resolve } from 'path';

export type LoggerType = {
  getLogger: (name?: string) => log4js.Logger;
};

// set log path
app.setAppLogsPath();

log4js.configure({
  appenders: {
    trace: {
      type: 'file',
      filename: resolve(app.getPath('logs'), 'trace.log')
    }
  },
  categories: { default: { appenders: ['trace'], level: 'error' } }
});

const logger = log4js.getLogger();
logger.level = levels.ALL;

const de: LoggerType = {
  getLogger(name?: string) {
    if (name) {
      const logger = log4js.getLogger(name);
      logger.level = levels.ALL;
      return logger;
    } else {
      return logger;
    }
  }
};

export default de;
