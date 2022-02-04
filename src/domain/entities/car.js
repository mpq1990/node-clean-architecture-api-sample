class Car {
  constructor({ id, brand, make, model, color, mileage }) {
    this.id = id;
    this.brand = brand;
    this.make = make;
    this.model = model;
    this.color = color;
    this.mileage = mileage;
  }

  getId() {
    return this.id;
  }

  getBrand() {
    return this.brand;
  }

  getMake() {
    return this.make;
  }

  geModel() {
    return this.model;
  }

  getColor() {
    return this.color;
  }

  getMileage() {
    return this.mileage;
  }
}

module.exports = Car;
