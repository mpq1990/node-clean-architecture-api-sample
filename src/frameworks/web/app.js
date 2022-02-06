var createError = require('http-errors');
const express = require('express');

const apiRouter = require('./routes');
const { authenticate } = require('./middleware/authentication');

const app = (repositories) => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/api', authenticate, apiRouter(repositories.carRepository));

  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, _next) {
    const message = err.message;
    const error = process.env.NODE_ENV === 'development' ? err : {};
    console.error(error);
    res.status(err.status || 500);
    res.json({ errors: message });
  });

  return app;
};

module.exports = app;
