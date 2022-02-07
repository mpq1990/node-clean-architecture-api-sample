class DeleteCar {
  constructor(carRepository) {
    this.carRepository = carRepository;
  }

  /**
   *
   * @param {id of the car} id
   * @returns a promise with the deleted car object
   */
  execute(id) {
    return this.carRepository.delete(id);
  }
}

module.exports = DeleteCar;
