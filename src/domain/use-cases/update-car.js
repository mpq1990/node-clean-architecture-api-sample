class UpdateCar {
  constructor(carRepository) {
    this.carRepository = carRepository;
  }

  /**
   *
   * @param {id of the car} id
   * @param {car object} payload
   * @returns a promise with the updated car object
   */
  execute(id, payload) {
    return this.carRepository.update(id, payload);
  }
}

module.exports = UpdateCar;
