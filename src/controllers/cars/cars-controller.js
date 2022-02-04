const AddCar = require('../../domain/use-cases/add-car.js');
const Ajv = require('ajv');
const carSchema = require('./car-schema');

class CarsController {
  constructor(carRepository) {
    this.addCar = new AddCar(carRepository);
    this.ajv = new Ajv();
  }

  addNewCar(carPayload) {
    const validate = this.ajv.compile(carSchema);
    const valid = validate(carPayload);

    if (valid) {
      return {
        success: true,
        car: this.addCar.execute(carPayload),
        errors: null,
      };
    } else {
      return {
        success: false,
        car: null,
        errors: this.ajv.errorsText(validate.errors),
      };
    }
  }
}

module.exports = CarsController;
