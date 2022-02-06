const dbProvider = (db) => {
  if (db === 'mongodb') {
    const DatabaseService = require('./mongodb/database-service');
    return new DatabaseService();
  } else if (db === 'inMemoryMongodb') {
    const InMemoryDatabaseService = require('./mongodb/in-memory-database-service');
    return new InMemoryDatabaseService();
  } else throw new Error('Provider not implemented');
};

module.exports = dbProvider;
