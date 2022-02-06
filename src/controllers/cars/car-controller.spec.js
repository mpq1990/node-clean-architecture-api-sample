const { expect } = require('chai');
const CarsController = require('./cars-controller');

describe('execute', () => {
  describe('addCar', () => {
    it('returns a car object use case', () => {
      const repository = {
        add: (car) => Promise.resolve(car),
      };

      let input = {
        id: 1,
        make: '1994',
        color: 'blue',
        model: 'corolla',
        brand: 'toyota',
        mileage: 2000,
      };

      const controller = new CarsController(repository);
      return controller.addCar(input).then((carObject) => {
        expect(carObject.car.id).to.equal(1);
      });
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
      return controller.addCar(input).then(
        (_carObject) => {},
        (err) => {
          expect(err.errors).to.equal(
            `data must have required property 'model', data must have required property 'brand', data must have required property 'mileage', data must have required property 'color'`
          );
        }
      );
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
        mileage: 2000,
        turbo: false,
      };

      const controller = new CarsController(repository);
      return controller.addCar(input).then(
        (_carObject) => {},
        (error) => {
          expect(error.errors).to.equal(
            'data must NOT have additional properties'
          );
        }
      );
    });
  });

  describe('getById', () => {});

  describe('getAll', () => {
    it('returns all car from the repository ', () => {
      const repository = {
        getAll: () => Promise.resolve([expectedOut]),
      };

      let expectedOut = {
        id: 1,
        make: '1994',
        color: 'blue',
        model: 'corolla',
        brand: 'toyota',
        mileage: 2000,
      };

      const controller = new CarsController(repository);
      return controller.getAll().then((carsObject) => {
        expect(carsObject.cars.length).to.equal(1);
      });
    });
  });

  describe('getById', () => {
    it('returns car from the repository ', () => {
      const repository = {
        getById: (_id) => Promise.resolve(expectedOut),
      };

      let expectedOut = {
        id: 1,
        make: '1994',
        color: 'blue',
        model: 'corolla',
        brand: 'toyota',
        mileage: 2000,
      };

      const controller = new CarsController(repository);
      return controller.getById().then((carsObject) => {
        expect(carsObject.car.color).to.equal('blue');
      });
    });
  });

  describe('delete', () => {
    it('returns all car from the repository ', () => {
      const repository = {
        delete: (_id) => Promise.resolve(expectedOut),
      };

      let expectedOut = {
        id: 1,
        make: '1994',
        color: 'blue',
        model: 'corolla',
        brand: 'toyota',
        mileage: 2000,
      };

      const controller = new CarsController(repository);
      return controller.delete().then((carsObject) => {
        expect(carsObject.car.color).to.equal('blue');
      });
    });
  });

  describe('update', () => {
    it('returns updated car ', () => {
      const repository = {
        update: (_id, _payload) => Promise.resolve(expectedOut),
      };

      let expectedOut = {
        make: '1994',
        color: 'blue',
        model: 'corolla',
        brand: 'toyota',
        mileage: 2000,
      };

      const controller = new CarsController(repository);
      return controller.update(1, expectedOut).then((carsObject) => {
        expect(carsObject.car.color).to.equal('blue');
      });
    });

    it('does not accept id in update payload', () => {
      const repository = {
        update: (_id, _payload) => Promise.resolve(expectedOut),
      };

      let expectedOut = {
        id: 1,
        make: '1994',
        color: 'blue',
        model: 'corolla',
        brand: 'toyota',
        mileage: 2000,
      };

      const controller = new CarsController(repository);
      return controller.update(1, expectedOut).then(
        () => {},
        (error) => {
          expect(error.errors).to.equal(
            'data must NOT have additional properties'
          );
        }
      );
    });
  });
});
