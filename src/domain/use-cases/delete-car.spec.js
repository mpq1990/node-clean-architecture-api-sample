const { expect } = require('chai');
const DeleteCar = require('./delete-car');

describe('execute', () => {
  it('returns a car object from the repository', () => {
    const repository = {
      delete: (_id) => Promise.resolve(car),
    };

    let car = {
      id: 2,
      make: '1994',
    };

    const deleteCar = new DeleteCar(repository);
    return deleteCar.execute().then((carObject) => {
      expect(carObject.id).to.equal(2);
    });
  });
});
