const supertest = require('supertest');

const fakeRepository = {
  carRepository: {
    add: (car) => Promise.resolve(car),
    getAll: () => Promise.resolve([{ id: 1 }]),
    getById: (id) => Promise.resolve({ id, color: 'green' }),
    update: (_id, _payload) => Promise.resolve({ color: 'blue' }),
    delete: (_id) => Promise.resolve(),
  },
};

const app = require('../app')(fakeRepository);

before(() => {
  process.env.API_KEY = 'test';
});

describe('GET /api/cars', () => {
  it('should return 200', (done) => {
    supertest(app)
      .get('/api/cars')
      .set('x-api-key', process.env.API_KEY)
      .expect([{ id: 1 }])
      .expect(200, done);
  });

  it('should return 404 in case of wrong url', (done) => {
    supertest(app)
      .get('/api/carss')
      .set('x-api-key', process.env.API_KEY)
      .expect(404, done);
  });

  it('should return 401 unauthenticated without the header', (done) => {
    supertest(app).get('/api/cars').expect(401, done);
  });
});

describe('POST /api/cars', () => {
  it('should return 201', (done) => {
    supertest(app)
      .post('/api/cars')
      .set('x-api-key', process.env.API_KEY)
      .set('Accept', 'application/json')
      .send({
        make: 'corolla',
        model: 'corolla',
        brand: 'corolla',
        color: 'blue',
        mileage: 2000,
      })
      .expect(201, done);
  });

  it('should return 400 validation error', (done) => {
    supertest(app)
      .post('/api/cars')
      .set('x-api-key', process.env.API_KEY)
      .set('Accept', 'application/json')
      .send({
        make: 'corolla',
        model: 'corolla',
      })
      .expect(400, done);
  });

  it('should return 404 in case of wrong url', (done) => {
    supertest(app)
      .post('/api/carss')
      .set('x-api-key', process.env.API_KEY)
      .expect(404, done);
  });
});

describe('GET /api/cars/:id', () => {
  it('should return 200', (done) => {
    supertest(app)
      .get('/api/cars/1')
      .set('x-api-key', process.env.API_KEY)
      .expect({ id: '1', color: 'green' })
      .expect(200, done);
  });

  it('should return 404 in case of wrong url', (done) => {
    supertest(app)
      .get('/api/carss')
      .set('x-api-key', process.env.API_KEY)
      .expect(404, done);
  });
});

describe('PATCH /api/cars/:id', () => {
  it('should return 200', (done) => {
    supertest(app)
      .patch('/api/cars/1')
      .set('x-api-key', process.env.API_KEY)
      .expect({ color: 'blue' })
      .expect(200, done);
  });

  it('should return 404 in case of wrong url', (done) => {
    supertest(app)
      .get('/api/carss')
      .set('x-api-key', process.env.API_KEY)
      .expect(404, done);
  });
});

describe('DELETE /api/cars/:id', () => {
  it('should return 204', (done) => {
    supertest(app)
      .delete('/api/cars/1')
      .set('x-api-key', process.env.API_KEY)
      .expect(204, done);
  });

  it('should return 404 in case of wrong url', (done) => {
    supertest(app)
      .get('/api/carss')
      .set('x-api-key', process.env.API_KEY)
      .expect(404, done);
  });
});
