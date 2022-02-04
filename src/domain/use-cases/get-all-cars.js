class GetAllCars {
  constructor(carRepository) {
    this.carRepository = carRepository;
  }

  execute() {
    return this.carRepository.getAll();
  }
}

module.exports = GetAllCars;
