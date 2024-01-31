const path = require('path'),
  { config } = require('dotenv');

config({
  allowEmptyValues: true,
  path: path.resolve(process.cwd(), '.env'),
});

module.exports = {
  defaultEnv: 'dev',
  'sql-file': true,
  dev: {
    driver: 'mysql',
    host: { ENV: 'MAIN_DB_HOST' },
    port: { ENV: 'MAIN_DB_PORT' },
    user: { ENV: 'MAIN_DB_USER' },
    password: { ENV: 'MAIN_DB_PASSWORD' },
    database: { ENV: 'MAIN_DB_NAME' },
    multipleStatements: true,
  },
};
