/**
 * Ideally this would be handled by a DI framework.
 * For now this function returns the db service based on the string passed by the caller.
 * @param {a string with the database name to use} db
 * @returns
 */
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
