/**
 * This class acts as an 'interface' between our business domains and external world
 * It enforces a contract (inversion of control), that external callers of this class must adhere
 * to before they can consume our business domain.
 */
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
