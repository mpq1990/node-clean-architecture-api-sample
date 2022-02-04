const CarRepository = require('../frameworks/db/mongodb/repository/carRepository');

module.exports = (() => {
  return {
    carRepository: new CarRepository(),
    db: 'mongodb',
  };
})();
