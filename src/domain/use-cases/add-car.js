const Car = require('../entities/car');

class AddCar {
  constructor(carRepository) {
    this.carRepository = carRepository;
  }

  execute(carObject) {
    console.log('add car use case');
    const car = new Car(carObject);
    console.log(car);
    console.log(this.carRepository);
    return this.carRepository.add(car);
  }
}

module.exports = AddCar;
