const { expect } = require('chai');
const AddCar = require('./add-car');

describe('execute', () => {
  it('returns a car object from the repository', () => {
    const repository = {
      add: (car) => car,
    };

    let input = {
      id: 1,
      make: '1994',
    };

    const addCar = new AddCar(repository);
    const carObject = addCar.execute(input);
    expect(carObject.id).to.equal(1);
  });
});
