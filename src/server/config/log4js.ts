import config from 'src/server/config/config';
import { FILE_MAX_SIZE_10MB } from 'src/server/constants/bytes';

export default {
  appenders: {
    dateFile: {
      alwaysIncludePattern: true,
      compress: true,
      filename: `${config.LOGGING.dir}/givingside.log`,
      keepFileExt: true,
      pattern: 'yyyy-MM-dd-hh',
      type: 'dateFile',
    },
    file: {
      backups: 2, // keep five backup files
      compress: true, // compress the backups
      encoding: 'utf-8',
      filename: `${config.LOGGING.dir}/givingside.log`,
      flags: 'w+',
      maxLogSize: FILE_MAX_SIZE_10MB, // = 10Mb
      mode: 0o0640,
      type: 'file',
    },
    out: {
      type: 'stdout',
    },
  },
  categories: {
    default: {
      appenders: ['file', 'dateFile', 'out'],
      level: 'trace',
    },
  },
};
