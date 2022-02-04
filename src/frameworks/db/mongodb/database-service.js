const mongoose = require('mongoose');
const IDatabaseServices = require('../../web/contracts/database-service');
const CarRepository = require('./repository/carRepository');

class DatabaseServices extends IDatabaseServices {
  constructor() {
    super();
    this.repository = new CarRepository();
  }

  initDatabase() {
    const mongoDB = 'mongodb://localhost:27017';

    return mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

module.exports = DatabaseServices;
