class DeleteCar {
  constructor(carRepository) {
    this.carRepository = carRepository;
  }

  execute(id) {
    return this.carRepository.delete(id);
  }
}

module.exports = DeleteCar;
