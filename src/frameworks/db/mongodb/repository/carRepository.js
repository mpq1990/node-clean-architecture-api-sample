const ICarRepository = require('../../../../domain/contracts/car-repository');
const Car = require('../model/car');
const carDto = require('./dto/car');

class CarRepository extends ICarRepository {
  constructor() {
    super();
  }

  add(carPayload) {
    console.log('repo');
    console.log(carPayload);
    const car = new Car(carPayload);
    return new Promise((resolve, reject) => {
      car.save((err) => {
        if (err) reject(err);

        resolve(carDto(car));
      });
    });
  }
}

module.exports = CarRepository;
