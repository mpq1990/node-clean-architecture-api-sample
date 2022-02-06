const { expect } = require('chai');
const UpdateCar = require('./update-car');

describe('execute', () => {
  it('returns an updated car object from the repository', () => {
    const repository = {
      update: (_id) => Promise.resolve(car),
    };

    let car = {
      id: 2,
      make: '1994',
    };

    const updateCar = new UpdateCar(repository);
    return updateCar.execute(1).then((carObject) => {
      expect(carObject.id).to.equal(2);
    });
  });
});
