class UpdateCar {
  constructor(carRepository) {
    this.carRepository = carRepository;
  }

  execute(id, payload) {
    return this.carRepository.update(id, payload);
  }
}

module.exports = UpdateCar;
