const Car = require('../entities/car');

class AddCar {
  constructor(carRepository) {
    this.carRepository = carRepository;
  }

  execute(carObject) {
    const car = new Car(carObject);
    return this.carRepository.add(car);
  }
}

module.exports = AddCar;
