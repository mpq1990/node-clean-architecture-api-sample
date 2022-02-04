const IDatabaseServices = require('../../web/contracts/database-service');
const CarRepository = require('./repository/carRepository');

class DatabaseServices extends IDatabaseServices {
  constructor() {
    super();
    this.repository = new CarRepository();
  }

  initDatabase() {
    return Promise.resolve();
  }
}

module.exports = DatabaseServices;
