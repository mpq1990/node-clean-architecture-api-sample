const express = require('express');
const CarsController = require('../../../controllers/cars/cars-controller');

const carRouter = (repository) => {
  const router = express.Router();

  const controller = new CarsController(repository);

  router.route('/').get((req, res) => {
    res.json('Hi');
  });

  return router;
};

module.exports = carRouter;
