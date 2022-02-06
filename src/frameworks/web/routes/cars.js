const express = require('express');
var createError = require('http-errors');
const CarsController = require('../../../controllers/cars/cars-controller');

const carRouter = (repository) => {
  const router = express.Router();
  const controller = new CarsController(repository);

  router.route('/').get((req, res, next) => {
    controller
      .getAll()
      .then(
        ({ cars }) => {
          res.json(cars);
        },
        (err) => {
          next((err.errors = err + err.errors));
        }
      )
      .catch((err) => next(err));
  });

  router.route('/').post((req, res, next) => {
    controller
      .addCar(req.body)
      .then(
        ({ cars }) => {
          res.json(cars);
        },
        (err) => {
          if (err.validation) {
            next(createError(400, err.errors));
          } else {
            next(err.errors);
          }
        }
      )
      .catch((err) => next(err));
  });

  router.route('/:id').get((req, res, next) => {
    controller
      .getById(req.params.id)
      .then(
        ({ car }) => {
          if (car) {
            res.json(car);
          } else {
            next(createError(404));
          }
        },
        (err) => {
          if (err.validation) {
            next(createError(400, err.errors));
          } else {
            next(err.errors);
          }
        }
      )
      .catch((err) => next(err));
  });

  router.route('/:id').delete((req, res, next) => {
    controller
      .delete(req.params.id)
      .then(
        (_result) => {
          res.status(204).end();
        },
        (err) => {
          if (err.validation) {
            next(createError(400, err.errors));
          } else {
            next(err.errors);
          }
        }
      )
      .catch((err) => next(err));
  });

  return router;
};

module.exports = carRouter;
