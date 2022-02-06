var createError = require('http-errors');

const authenticate = (req, res, next) => {
  if (
    req.headers['x-api-key'] &&
    req.headers['x-api-key'] === process.env.API_KEY
  )
    next();
  else next(createError(401));
};

module.exports = { authenticate };
