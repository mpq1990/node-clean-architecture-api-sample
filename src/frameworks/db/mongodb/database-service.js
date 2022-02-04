const IDatabaseServices = require('../../web/contracts/database-service');

class DatabaseServices extends IDatabaseServices {
  constructor() {
    super();
  }

  initDatabase() {
    return Promise.resolve();
  }
}

module.exports = DatabaseServices;
