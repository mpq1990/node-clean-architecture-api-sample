const { expect } = require('chai');
const { toCar } = require('./car-dto');

describe('carDto', () => {
  it('converts the car mongo model to domain model', () => {
    let carModel = {
      _id: 1,
      make: 'make',
      model: 'model',
      color: 'color',
      mileage: 2000,
    };

    let result = toCar(carModel);

    expect(result.id).to.equal(1);
    expect(result.make).to.equal('make');
    expect(result.color).to.equal('color');
    expect(result.mileage).to.equal(2000);
    expect(result).to.not.have.own.property('_id');
  });
});
