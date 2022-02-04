const { expect } = require('chai');
const supertest = require('supertest');

const fakeRepository = {
  carRepository: {
    add: (car) => Promise.resolve(car),
    getAll: () => Promise.resolve([]),
  },
};

const app = require('../app')(fakeRepository);

describe('GET /api/cars', () => {
  it('should return 200', (done) => {
    supertest(app).get('/api/cars').expect(200, done);
  });

  it('should return 404 in case of wrong url', (done) => {
    supertest(app).get('/api/carss').expect(404, done);
  });
});
