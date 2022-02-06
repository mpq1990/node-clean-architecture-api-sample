const supertest = require('supertest');

const fakeRepository = {
  carRepository: {
    add: (car) => Promise.resolve(car),
    getAll: () => Promise.resolve([{ id: 1 }]),
    getById: (id) => Promise.resolve({ id, color: 'green' }),
  },
};

const app = require('../app')(fakeRepository);

describe('GET /api/cars', () => {
  it('should return 200', (done) => {
    supertest(app)
      .get('/api/cars')
      .expect([{ id: 1 }])
      .expect(200, done);
  });

  it('should return 404 in case of wrong url', (done) => {
    supertest(app).get('/api/carss').expect(404, done);
  });
});

describe('GET /api/cars', () => {
  it('should return 200', (done) => {
    supertest(app)
      .get('/api/cars')
      .expect([{ id: 1 }])
      .expect(200, done);
  });

  it('should return 404 in case of wrong url', (done) => {
    supertest(app).get('/api/carss').expect(404, done);
  });
});

describe('GET /api/cars/:id', () => {
  it('should return 200', (done) => {
    supertest(app)
      .get('/api/cars/1')
      .expect({ id: '1', color: 'green' })
      .expect(200, done);
  });

  it('should return 404 in case of wrong url', (done) => {
    supertest(app).get('/api/carss').expect(404, done);
  });
});
