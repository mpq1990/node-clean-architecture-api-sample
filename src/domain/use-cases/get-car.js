class GetCar {
  constructor(carRepository) {
    this.carRepository = carRepository;
  }

  /**
   *
   * @param {if of the car} id
   * @returns a promise with the car object
   */
  execute(id) {
    return this.carRepository.getById(id);
  }
}

module.exports = GetCar;
