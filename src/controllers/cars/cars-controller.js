const AddCar = require('../../domain/use-cases/add-car.js');
const Ajv = require('ajv');
const carSchema = require('./car-schema');

class CarsController {
  constructor(carRepository) {
    this.addCar = new AddCar(carRepository);
    this.ajv = new Ajv({ allErrors: true });
  }

  addNewCar(carPayload) {
    const validate = this.ajv.compile(carSchema);
    const valid = validate(carPayload);
    return new Promise((resolve, reject) => {
      if (valid) {
        this.addCar.execute(carPayload).then(
          (car) => {
            console.log('sss');
            resolve({
              car,
              validation: true,
              errors: null,
            });
          },
          (error) => {
            console.log('ha');
            reject({
              validation: false,
              car: null,
              errors: error,
            });
          }
        );
      } else {
        console.log('hee');
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
