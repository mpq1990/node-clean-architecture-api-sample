const express = require('express');
const cars = require('./cars');

const apiRouter = (repository) => {
  const router = express.Router();
  const carRouter = cars(repository);

  router.use('/', carRouter);

  return router;
};

module.exports = apiRouter;
