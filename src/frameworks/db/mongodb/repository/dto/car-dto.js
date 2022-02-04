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

module.exports = { toCar };
