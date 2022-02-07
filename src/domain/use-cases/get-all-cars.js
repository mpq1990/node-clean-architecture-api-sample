class GetAllCars {
  constructor(carRepository) {
    this.carRepository = carRepository;
  }

  /**
   *
   * @returns a promise with all the cars
   */
  execute() {
    return this.carRepository.getAll();
  }
}

module.exports = GetAllCars;
