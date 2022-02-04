const ICarRepository = require('../../../../domain/contracts/car-repository');

class CarRepository extends ICarRepository {
  constructor() {
    super();
  }

  add = (car) => car;
}

module.exports = CarRepository;
