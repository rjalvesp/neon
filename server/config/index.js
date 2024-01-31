const R = require('ramda');
const path = require('path');
const CorsOriginError = require('../common/errors/cors-origin');
const { ENVIRONMENTS } = require('../common/constants/system');

require('dotenv-safe').config({
  allowEmptyValues: true,
  example: path.join(__dirname, '..', '.env.example'),
});

const config = {
  server: {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.NODE_PORT, 10),
    corsOptions: {
      origin: (origin, callback) => {
        const whitelist = JSON.parse(process.env.CORS_WHITELIST);
        if (
          Object.keys(R.omit(['production'], ENVIRONMENTS)).includes(
            process.env.NODE_ENV,
          )
        ) {
          whitelist.push(undefined);
        }
        if (!whitelist.includes(origin)) {
          return callback(new CorsOriginError());
        }
        callback(null, true);
      },
    },
  },
  services: {
    databases: {
      main: {
        host: process.env.MAIN_DB_HOST,
        port: process.env.MAIN_DB_PORT,
        user: process.env.MAIN_DB_USER,
        password: process.env.MAIN_DB_PASSWORD,
        database: process.env.MAIN_DB_NAME,
      },
    },
  },
};

module.exports = config;
