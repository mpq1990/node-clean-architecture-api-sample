const AddCarUseCase = require('../../domain/use-cases/add-car.js');
const Ajv = require('ajv');
const carSchema = require('./car-schema');

class CarsController {
  constructor(carRepository) {
    this.addCarUseCase = new AddCarUseCase(carRepository);
    this.ajv = new Ajv({ allErrors: true });
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
