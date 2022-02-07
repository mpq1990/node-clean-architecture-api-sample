const Ajv = require('ajv');
const carSchema = require('./car-schema');
const carUpdateSchema = require('./car-update.schema');
const AddCarUseCase = require('../../domain/use-cases/add-car.js');
const GetAllCarsUseCase = require('../../domain/use-cases/get-all-cars');
const GetCar = require('../../domain/use-cases/get-car.js');
const DeleteCar = require('../../domain/use-cases/delete-car');
const UpdateCarUseCase = require('../../domain/use-cases/update-car');

/**
 * The controller that acts as a mediator between our business and external world
 * This is responsible for converting data to and form the entities schema and also
 * enforces the schema for business entities.
 */
class CarsController {
  constructor(carRepository) {
    this.addCarUseCase = new AddCarUseCase(carRepository);
    this.getAllCarsUseCase = new GetAllCarsUseCase(carRepository);
    this.getCarUseCase = new GetCar(carRepository);
    this.deleteCarUseCase = new DeleteCar(carRepository);
    this.updateCarUseCase = new UpdateCarUseCase(carRepository);
    this.ajv = new Ajv({ allErrors: true });
  }

  /**
   *
   * @returns a promise object with the cars list or error if present
   */
  getAll() {
    return new Promise((resolve, reject) => {
      this.getAllCarsUseCase.execute().then(
        (cars) => {
          resolve({
            cars,
            validation: true,
            errors: null,
          });
        },
        (error) => {
          reject({
            validation: false,
            cars: null,
            errors: error,
          });
        }
      );
    });
  }

  /**
   *
   * @param {id of the car} id
   * @returns a promise object with the car object or error if present
   */
  getById(id) {
    return new Promise((resolve, reject) => {
      this.getCarUseCase.execute(id).then(
        (car) => {
          resolve({
            car,
            validation: true,
            errors: null,
          });
        },
        (error) => {
          reject({
            validation: false,
            car: null,
            errors: error,
          });
        }
      );
    });
  }

  /**
   *
   * @param {id of the car} id
   * @returns a promise object with the car object or error if present
   */
  delete(id) {
    return new Promise((resolve, reject) => {
      this.deleteCarUseCase.execute(id).then(
        (car) => {
          resolve({
            car,
            validation: true,
            errors: null,
          });
        },
        (error) => {
          reject({
            validation: false,
            car: null,
            errors: error,
          });
        }
      );
    });
  }

  /**
   *
   * @param {id of the car} id
   * @param {car object with data that needs update} payload
   * @returns a promise object with the updated car object or error if present
   */
  update(id, payload) {
    const validate = this.ajv.compile(carUpdateSchema);
    const valid = validate(payload);
    return new Promise((resolve, reject) => {
      if (valid) {
        this.updateCarUseCase.execute(id, payload).then(
          (car) => {
            resolve({
              car,
              validation: true,
              errors: null,
            });
          },
          (error) => {
            reject({
              validation: false,
              car: null,
              errors: error,
            });
          }
        );
      } else {
        reject({
          car: null,
          validation: true,
          errors: this.ajv.errorsText(validate.errors),
        });
      }
    });
  }

  /**
   *
   * @param {car object that needs to be persisted} carPayload
   * @returns a promise object with the updated car object or error if present
   */
  addCar(carPayload) {
    const validate = this.ajv.compile(carSchema);
    const valid = validate(carPayload);
    return new Promise((resolve, reject) => {
      if (valid) {
        this.addCarUseCase.execute(carPayload).then(
          (car) => {
            resolve({
              car,
              validation: true,
              errors: null,
            });
          },
          (error) => {
            reject({
              validation: false,
              car: null,
              errors: error,
            });
          }
        );
      } else {
        reject({
          car: null,
          validation: true,
          errors: this.ajv.errorsText(validate.errors),
        });
      }
    });
  }
}

module.exports = CarsController;
