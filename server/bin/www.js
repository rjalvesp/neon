const config = require('../config');
const app = require('../app');
const debug = require('debug')('cebu-studio:server');
const http = require('http');

const port = config.server.port;

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES': {
      // eslint-disable-next-line no-console
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    }
    case 'EADDRINUSE': {
      // eslint-disable-next-line no-console
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    }
    default: {
      throw error;
    }
  }
};

const onListening = () => {
  const addr = server.address();
  debug(`Listening on port ${addr.port}`);
};

app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
