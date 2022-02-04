#!/usr/bin/env node

const http = require('http');
const dependencies = require('../../../config/dependencies');
const dbProvider = require('../../db');
const databaseService = dbProvider(dependencies.db);
const app = require('../app')(dependencies);
const server = http.createServer(app);
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

databaseService.initDatabase().then(
  () => {
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
  },
  (err) => {
    console.error('could not load database ', err);
  }
);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('port listening on port ', bind);
}
