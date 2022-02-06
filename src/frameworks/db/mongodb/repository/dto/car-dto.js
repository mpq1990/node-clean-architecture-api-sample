const toCar = (car) => {
  let { _id: omit, ...res } = car;
  return {
    id: car._id,
    model: car.model,
    make: car.make,
    color: car.color,
    mileage: car.mileage,
  };
};

const toCars = (cars) => {
  return cars.map(toCar);
};

const fromCarId = (id) => {
  return {
    _id: id,
  };
};

module.exports = { toCar, toCars, fromCarId };
