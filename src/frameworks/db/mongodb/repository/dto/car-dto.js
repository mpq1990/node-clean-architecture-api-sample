const toCar = (car) => {
  // eslint-disable-next-line no-unused-vars
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
  return cars.map(toMetaCar);
};

const fromCarId = (id) => {
  return {
    _id: id,
  };
};

const toMetaCar = (car) => {
  // eslint-disable-next-line no-unused-vars
  let { _id: omit, ...res } = car;
  return {
    id: car._id,
    model: car.model,
    make: car.make,
  };
};

module.exports = { toCar, toCars, fromCarId, toMetaCar };
