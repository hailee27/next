/* eslint-disable no-console */
/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT ?? 'local';
const APM_SERVER_URL = process.env.NEXT_PUBLIC_APM_SERVER_URL ?? 'http://localhost:8200';
const APM_SERVER_SECRET_TOKEN = process.env.NEXT_PUBLIC_APM_SERVER_SECRET_TOKEN ?? undefined;
const SERVICE_NAME = process.env.NEXT_PUBLIC_SERVICE_NAME ?? 'example-next';

module.exports = {
  serverUrl: APM_SERVER_URL,
  secretToken: APM_SERVER_SECRET_TOKEN,
  serviceName: SERVICE_NAME,
  environment: ENVIRONMENT,
  active: ['staging', 'production'].includes(ENVIRONMENT),
};
