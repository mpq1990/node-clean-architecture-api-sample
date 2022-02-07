const mongoose = require('mongoose');
const IDatabaseServices = require('../../web/contracts/database-service');
const CarRepository = require('./repository/car-repository');

/**
 * This service is the concrete implementation to the service interface exposed by the web framework
 * Any caller must implement this service to connect or disconnect to the database.
 * Ideally this class would be injected via a dependency injection container
 */
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
