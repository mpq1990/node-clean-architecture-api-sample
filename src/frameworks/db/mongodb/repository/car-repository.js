const ICarRepository = require('../../../../domain/contracts/car-repository');
const Car = require('../model/car');
const { toCar, toCars } = require('./dto/car-dto');

class CarRepository extends ICarRepository {
  constructor() {
    super();
  }

  add(carPayload) {
    const car = new Car(carPayload);
    return new Promise((resolve, reject) => {
      car.save((err) => {
        if (err) reject(err);

        resolve(toCar(car));
      });
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      Car.find({}).then((cars) => {
        resolve(toCars(cars));
      });
    });
  }
}

module.exports = CarRepository;
