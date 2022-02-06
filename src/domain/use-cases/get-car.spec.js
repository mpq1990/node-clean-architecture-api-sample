const { expect } = require('chai');
const GetCar = require('./get-car');

describe('execute', () => {
  it('returns a car object from the repository', () => {
    const repository = {
      getById: (_id) => Promise.resolve(car),
    };

    let car = {
      id: 2,
      make: '1994',
    };

    const getCars = new GetCar(repository);
    return getCars.execute().then((carObject) => {
      expect(carObject.id).to.equal(2);
    });
  });
});
