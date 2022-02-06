const mongoose = require('mongoose');
const IDatabaseServices = require('../../web/contracts/database-service');
const CarRepository = require('./repository/car-repository');

class DatabaseServices extends IDatabaseServices {
  constructor() {
    super();
    this.repository = new CarRepository();
  }

  initDatabase() {
    const mongoDB = `${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.DATABASE_NAME}`;

    return mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

module.exports = DatabaseServices;
