const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const IDatabaseServices = require('../../web/contracts/database-service');
const CarRepository = require('./repository/car-repository');

class InMemoryDatabaseService extends IDatabaseServices {
  constructor() {
    super();
    this.repository = new CarRepository();
    this.mongoServer = null;
  }

  initDatabase() {
    const opts = { useNewUrlParser: true, useUnifiedTopology: true };

    return MongoMemoryServer.create({ debug: true })
      .then((mongoServer) => {
        this.mongoServer = mongoServer;
        const mongoUri = mongoServer.getUri();
        return mongoose.connect(mongoUri, opts);
      })
      .catch((err) => {
        throw new Error('Error connecting to db', err);
      });
  }

  disconnect() {
    return mongoose.disconnect().then(() => {
      return this.mongoServer.stop();
    });
  }
}

module.exports = InMemoryDatabaseService;
