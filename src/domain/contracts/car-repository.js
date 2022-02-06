class CarRepository {
  constructor() {}

  add(_carInstance) {
    return Promise.reject(new Error('not implemented'));
  }

  update(_carId) {
    return Promise.reject(new Error('not implemented'));
  }

  delete(_carId) {
    return Promise.reject(new Error('not implemented'));
  }

  getById(_carId) {
    return Promise.reject(new Error('not implemented'));
  }

  getAll() {
    return Promise.reject(new Error('not implemented'));
  }
}

module.exports = CarRepository;
