const supertest = require('supertest');

const app = require('../app')({
  add: (car) => car,
});

describe.only('GET /api/cars', () => {
  it('should return 200', (done) => {
    supertest(app).get('/api/cars').expect(200, done);
  });

  it('should return 404 in case of wrong url', (done) => {
    supertest(app).get('/api/carss').expect(404, done);
  });
});
