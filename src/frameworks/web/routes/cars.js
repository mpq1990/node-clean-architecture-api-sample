const express = require('express');
var createError = require('http-errors');
const CarsController = require('../../../controllers/cars/cars-controller');

const carRouter = (repository) => {
  const router = express.Router();
  const controller = new CarsController(repository);

  router.route('/').get((req, res) => {
    res.json('Hi');
  });

  router.route('/').post((req, res, next) => {
    controller.addCar(req.body).then(
      ({ car }) => {
        res.json(car);
      },
      (err) => {
        if (err.validation) {
          next(createError(400, err.errors));
        } else {
          next(err.errors);
        }
      }
    );
  });

  return router;
};

module.exports = carRouter;
