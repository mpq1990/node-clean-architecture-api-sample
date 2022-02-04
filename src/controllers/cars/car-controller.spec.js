const { expect } = require('chai');
const CarsController = require('./cars-controller');

describe('execute', () => {
  it('returns a car object use case', (done) => {
    const repository = {
      add: (car) => Promise.resolve(car),
    };

    let input = {
      id: 1,
      make: '1994',
      color: 'blue',
      model: 'corolla',
      brand: 'toyota',
      mileage: '2000',
    };

    const controller = new CarsController(repository);
    controller.addNewCar(input).then((carObject) => {
      expect(carObject.car.id).to.equal(1);
    });

    done();
  });

  it('throws an error if required property is not present', () => {
    const repository = {
      add: (car) => car,
    };

    let input = {
      id: 1,
      make: '1994',
    };

    const controller = new CarsController(repository);
    controller.addNewCar(input).then((carObject) => {
      expect(carObject.errors).to.equal(
        "data must have required property 'color'"
      );
      done();
    });
  });

  it('throws an error if additional property is present in the object', () => {
    const repository = {
      add: (car) => car,
    };

    let input = {
      id: 1,
      make: '1994',
      color: 'blue',
      model: 'corolla',
      brand: 'toyota',
      mileage: '2000',
      turbo: false,
    };

    const controller = new CarsController(repository);
    controller.addNewCar(input).then((carObject) => {
      expect(carObject.errors).to.equal(
        'data must NOT have additional properties'
      );
      done();
    });
  });
});
