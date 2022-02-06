const DatabaseService = require('./mongodb/database-service');
const InMemoryDatabaseService = require('./mongodb/in-memory-database-service');

const dbProvider = (db) => {
  if (db === 'mongodb') return new DatabaseService();
  else if (db === 'inMemoryMongodb') return new InMemoryDatabaseService();
  else throw new Error('Provider not implemented');
};

module.exports = dbProvider;
