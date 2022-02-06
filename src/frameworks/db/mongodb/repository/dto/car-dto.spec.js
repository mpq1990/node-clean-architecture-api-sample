const { expect } = require('chai');
const { toCar, toCars, fromCarId, toMetaCar } = require('./car-dto');

describe('carDto', () => {
  describe('toCar', () => {
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

  describe('toCars', () => {
    it('converts the cars array mongo model to domain model array', () => {
      let carModels = [
        {
          _id: 1,
          make: 'make',
          model: 'model',
          color: 'color',
          mileage: 2000,
        },
        {
          _id: 2,
          make: 'make',
          model: 'model',
          color: 'color',
          mileage: 2000,
        },
      ];

      let result = toCars(carModels);

      expect(result[0].id).to.equal(1);
      expect(result[0].make).to.equal('make');
      expect(result[0]).to.not.have.own.property('color');
      expect(result[0]).to.not.have.own.property('mileage');
      expect(result[0]).to.not.have.own.property('_id');
    });
  });

  describe('fromCarId', () => {
    it('converts the id to mongo specific id', () => {
      let id = 1;

      let result = fromCarId(id);

      expect(result._id).to.equal(1);
      expect(result).to.not.have.own.property('id');
    });
  });

  describe('toMetaCar', () => {
    it('converts the car mongo model to meta domain model', () => {
      let carModel = {
        _id: 1,
        make: 'make',
        model: 'model',
        color: 'color',
        mileage: 2000,
      };

      let result = toMetaCar(carModel);

      expect(result.id).to.equal(1);
      expect(result.make).to.equal('make');
      expect(result).to.not.have.own.property('color');
      expect(result).to.not.have.own.property('mileage');
      expect(result).to.not.have.own.property('_id');
    });
  });
});
