const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const HttpErrorHandler = require('./common/errors/http-error-handler');
const config = require('./config');
const { mainDb } = require('./services/databases');

const app = express();

mainDb.init();

app.set('port', process.env.NODE_PORT);
app.set('strict routing', true);
app.set('view engine', false);
app.use(helmet());
app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', cors(config.server.corsOptions), require('./api/'));
app.use(HttpErrorHandler);

module.exports = app;
