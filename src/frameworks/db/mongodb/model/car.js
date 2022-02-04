const { Schema, model } = require('mongoose');

const CarSchema = new Schema({
  brand: String,
  model: String,
  color: String,
  make: String,
  mileage: Number,
});

const Car = model('Car', CarSchema);
module.exports = Car;
