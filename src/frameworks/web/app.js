var createError = require('http-errors');
const express = require('express');

const apiRouter = require('./routes');

const app = (repositories) => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/api', apiRouter(repositories.studentRepository));

  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json('error');
  });

  return app;
};

module.exports = app;
