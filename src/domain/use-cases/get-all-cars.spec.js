const { expect } = require('chai');
const GetAllCars = require('./get-all-cars');

describe('execute', () => {
  it('returns a car object from the repository', () => {
    const repository = {
      getAll: (car) => cars,
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
    const carObject = getAllCars.execute();
    expect(carObject.length).to.equal(2);
  });
});
