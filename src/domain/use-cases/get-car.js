class GetCar {
  constructor(carRepository) {
    this.carRepository = carRepository;
  }

  execute(id) {
    return this.carRepository.getById(id);
  }
}

module.exports = GetCar;
