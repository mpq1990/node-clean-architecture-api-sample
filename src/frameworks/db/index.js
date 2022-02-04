const DatabaseService = require('./mongodb/database-service');

const dbProvider = (db) => {
  if (db === 'mongodb') return new DatabaseService();
};

module.exports = dbProvider;
