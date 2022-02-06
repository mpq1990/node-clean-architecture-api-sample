const { expect } = require('chai');
const GetAllCars = require('./get-all-cars');

describe('execute', () => {
  it('returns a car array from the repository', () => {
    const repository = {
      getAll: (car) => Promise.resolve(cars),
    };

    let cars = [
      {
        id: 1,
        make: '1994',
      },
      {
        id: 2,
        make: '1994',
      },
    ];

    const getAllCars = new GetAllCars(repository);
    return getAllCars.execute().then((carObject) => {
      expect(carObject.length).to.equal(2);
    });
  });
});
