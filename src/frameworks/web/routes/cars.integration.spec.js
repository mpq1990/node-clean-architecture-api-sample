const supertest = require('supertest');
const mongoose = require('mongoose');
const dbProvider = require('../../db');
const { expect } = require('chai');
const databaseService = dbProvider('inMemoryMongodb');
const app = require('../app')({ carRepository: databaseService.repository });

before((done) => {
  databaseService.initDatabase().then(() => {
    done();
  });
});

const carOne = {
  model: 'corolla',
  brand: 'toyota',
  make: '2019',
  color: 'white',
  mileage: 1000,
};

const carTwo = {
  model: 'spark',
  brand: 'cheverlot',
  make: '2020',
  color: 'blue',
  mileage: 44,
};

const buildCar = (payload) => {
  return new Promise((resolve, reject) => {
    supertest(app)
      .post('/api/cars')
      .send({
        ...payload,
      })
      .expect(201)
      .then(({ body }) => {
        resolve(body);
      })
      .then((err) => {
        reject(err);
      });
  });
};

beforeEach((done) => {
  mongoose.connection.db.collections().then((collections) => {
    let promises = [];
    for (let collection of collections) {
      promises.push(collection.deleteMany());
    }
    Promise.all(promises).then(() => {
      done();
    });
  });
});

describe('GET /api/cars', () => {
  it('returns the cars if present ', (done) => {
    Promise.all([buildCar(carOne), buildCar(carTwo)]).then((_cars) => {
      supertest(app)
        .get('/api/cars')
        .then(({ status, body }) => {
          expect(body.length).to.equal(2);
          expect(status).to.equal(200);
          done();
        })
        .catch(done);
    });
  });

  it('returns empty if no cars present', (done) => {
    supertest(app).get('/api/cars').expect([]).expect(200, done);
  });
});

describe('POST /api/cars', () => {
  it('should return 201', (done) => {
    supertest(app)
      .post('/api/cars')
      .set('Accept', 'application/json')
      .send(carOne)
      .then(({ status, body }) => {
        expect(body.color).to.equal(carOne.color);
        expect(status).to.equal(201);
        done();
      })
      .catch(done);
  });

  it('should return 400 validation error', (done) => {
    supertest(app)
      .post('/api/cars')
      .set('Accept', 'application/json')
      .send({
        make: 'corolla',
        model: 'corolla',
      })
      .expect(400, done);
  });
});

describe('GET /api/cars/:id', () => {
  it('should return 200', (done) => {
    Promise.all([buildCar(carOne), buildCar(carTwo)]).then((cars) => {
      supertest(app)
        .get(`/api/cars/${cars[0].id}`)
        .then(({ status, body }) => {
          expect(body.color).to.equal(carOne.color);
          expect(status).to.equal(200);
          done();
        })
        .catch(done);
    });
  });

  it('should return 404 if no car present', (done) => {
    supertest(app)
      .get(`/api/cars/${mongoose.Types.ObjectId()}`)
      .then(({ status }) => {
        expect(status).to.equal(404);
        done();
      })
      .catch(done);
  });
});

describe('PATCH /api/cars/:id', () => {
  it('should return updated car', (done) => {
    Promise.all([buildCar(carOne), buildCar(carTwo)]).then((cars) => {
      supertest(app)
        .patch(`/api/cars/${cars[0].id}`)
        .set('Accept', 'application/json')
        .send({ color: 'pink' })
        .then(({ status, body }) => {
          expect(body.color).to.equal('pink');
          expect(status).to.equal(200);
          done();
        })
        .catch(done);
    });
  });

  it('should return updated 400 if bad payload', (done) => {
    Promise.all([buildCar(carOne), buildCar(carTwo)]).then((cars) => {
      supertest(app)
        .patch(`/api/cars/${cars[0].id}`)
        .set('Accept', 'application/json')
        .send({ id: 1 })
        .then(({ status }) => {
          expect(status).to.equal(400);
          done();
        })
        .catch(done);
    });
  });
});

describe('DELETE /api/cars/:id', () => {
  it('should delete the car', (done) => {
    Promise.all([buildCar(carOne), buildCar(carTwo)]).then((cars) => {
      supertest(app)
        .delete(`/api/cars/${cars[0].id}`)
        .set('Accept', 'application/json')
        .send({ color: 'pink' })
        .then(({ status }) => {
          expect(status).to.equal(204);
          supertest(app)
            .get(`/api/cars/${cars[0].id}`)
            .then(({ status }) => {
              expect(status).to.equal(404);
              done();
            })
            .catch(done);
        })
        .catch(done);
    });
  });

  it('should return 404 if no car present', (done) => {
    supertest(app)
      .delete(`/api/cars/${mongoose.Types.ObjectId()}`)
      .then(({ status }) => {
        expect(status).to.equal(404);
        done();
      })
      .catch(done);
  });
});
