const car = (car) => {
  let { _id: omit, ...res } = car;
  return {
    id: car._id,
    ...res,
  };
};

module.exports = car;
