const ICarRepository = require('../../../../domain/contracts/car-repository');
const Car = require('../model/car');
const { toCar, toCars, fromCarId } = require('./dto/car-dto');

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
      Car.find({})
        .then((cars) => {
          resolve(toCars(cars));
        })
        .catch(reject);
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      Car.findById(id)
        .then((car) => {
          if (car) {
            resolve(toCar(car));
          } else {
            resolve(null);
          }
        })
        .catch(reject);
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      Car.deleteOne(fromCarId(id))
        .then(({ deletedCount }) => {
          if (deletedCount) {
            resolve(deletedCount);
          } else {
            reject();
          }
        })
        .catch(reject);
    });
  }

  update(id, payload) {
    console.log('in repo');
    return new Promise((resolve, reject) => {
      Car.updateOne(
        { _id: id },
        {
          ...payload,
        }
      )
        .then((car) => {
          resolve(toCar(car));
        })
        .catch(reject);
    });
  }
}

module.exports = CarRepository;
