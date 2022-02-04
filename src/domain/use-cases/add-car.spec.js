const { expect } = require('chai');
const AddCar = require('./add-car');

describe('execute', () => {
  it('returns a car object from the repository', () => {
    const repository = {
      add: (car) => Promise.resolve(car),
    };

    let input = {
      id: 1,
      make: '1994',
    };

    const addCar = new AddCar(repository);
    return addCar.execute(input).then(({ id, make }) => {
      expect(id).to.equal(1);
      expect(make).to.equal('1994');
    });
  });
});
