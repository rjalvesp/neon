const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const config = require('../../config');
const { ENVIRONMENTS } = require('../constants/system');

// eslint-disable-next-line no-unused-vars
const HttpErrorHandler = (error, _req, res, _next) => {
  let status;
  let body;
  switch (error.code) {
    case 'CorsOriginError': {
      status = StatusCodes.BAD_REQUEST;
      body = {
        error: ReasonPhrases.BAD_REQUEST,
        reason: error.message,
        code: '3.0',
      };
      break;
    }
    case 'ZodError': {
      status = StatusCodes.BAD_REQUEST;
      body = {
        error: ReasonPhrases.BAD_REQUEST,
        reason: error.message,
        code: '4.0',
      };
      break;
    }
    default: {
      status = StatusCodes.INTERNAL_SERVER_ERROR;
      body = {
        error: ReasonPhrases.INTERNAL_SERVER_ERROR,
        reason: error.message,
        code: 'UNKNOWN',
      };
      break;
    }
  }
  if (config.server.environment === ENVIRONMENTS.production) {
    delete body.reason;
  }
  res.status(status).json(body);
};

module.exports = HttpErrorHandler;
