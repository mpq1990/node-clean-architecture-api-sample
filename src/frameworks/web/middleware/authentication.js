var createError = require('http-errors');

const authenticate = (req, res, next) => {
  if (req.headers['x-api-key'] !== process.env.API_KEY) next(createError(401));
  next();
};

module.exports = { authenticate };
