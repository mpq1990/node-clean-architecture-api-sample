const Ajv = require('ajv');
const carSchema = require('./car-schema');
const carUpdateSchema = require('./car-update.schema');
const AddCarUseCase = require('../../domain/use-cases/add-car.js');
const GetAllCarsUseCase = require('../../domain/use-cases/get-all-cars');
const GetCar = require('../../domain/use-cases/get-car.js');
const DeleteCar = require('../../domain/use-cases/delete-car');
const UpdateCarUseCase = require('../../domain/use-cases/update-car');

class CarsController {
  constructor(carRepository) {
    this.addCarUseCase = new AddCarUseCase(carRepository);
    this.getAllCarsUseCase = new GetAllCarsUseCase(carRepository);
    this.getCarUseCase = new GetCar(carRepository);
    this.deleteCarUseCase = new DeleteCar(carRepository);
    this.updateCarUseCase = new UpdateCarUseCase(carRepository);
    this.ajv = new Ajv({ allErrors: true });
  }

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

  update(id, payload) {
    const validate = this.ajv.compile(carUpdateSchema);
    const valid = validate(payload);
    console.log('hi');
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
