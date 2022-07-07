/* global process, __dirname */
/* eslint-disable no-magic-numbers */

import { resolve } from 'path';

import dotenv from 'dotenv';

import { POSTMARK_EMAIL_TEMPLATE_IDS } from '../types/PostmarkEmailTemplate.type';

dotenv.config({
  path: resolve(__dirname, '../.env'),
});

const defaultPort = 3001;
const defaultHost = 'localhost';

const config = {
  ACCESS_CONTROL_ORIGIN_URLS:
    process.env.ACCESS_CONTROL_ORIGIN_URLS?.split(',') || [],
  BUCKET: process.env.GCLOUD_STORAGE_BUCKET || 'default',
  DEFAULT_LOCATION: 'us-central1',
  FILE_SIZE_LIMIT: 10 * 1024 * 1024, // 10 MB
  HOST: process.env.HOST || defaultHost,
  HTTPS: process.env.HTTPS,
  IS_PROD: process.env.NODE_ENV === 'production',
  LOG_LEVEL: 'debug',
  MIGRATION_TASK_QUEUE_NAME: 'migration-task',
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || defaultPort,
  PROJECT_ID: process.env.GOOGLE_CLOUD_PROJECT || '',
  RECORDS_PER_PAGE: 10,
  SECRET_CODE: process.env.SECRET_CODE || 'default',
  SECRET_TOKEN: process.env.SECRET_TOKEN,
  SERVICE: process.env.GAE_SERVICE,
  SESSION_MAX_AGE: 1000 * 60 * 60 * 24, // 1 day
  SWAGGER: process.env.SWAGGER,
  VERSION: process.env.GAE_VERSION || '',
  LOGGING: {
    dir: process.env.LOGGING_DIR || 'logs',
    level: process.env.LOGGING_LEVEL || 'debug',
  },
  USPS_USER_ID: process.env.USPS_USER_ID,
  NEW_GIVING_SIDE_POSTMARK_SERVER_API_KEY:
    process.env.NEW_GIVING_SIDE_POSTMARK_SERVER_API_KEY,
  POSTMARK_EMAIL_TEMPLATE_IDS: JSON.parse(
    process.env.POSTMARK_EMAIL_TEMPLATE_IDS ?? ''
  ) as POSTMARK_EMAIL_TEMPLATE_IDS,
};

export default config;
