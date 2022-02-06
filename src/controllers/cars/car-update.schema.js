const carUpdateSchema = {
  type: 'object',
  properties: {
    color: { type: 'string' },
    make: { type: 'string' },
    model: { type: 'string' },
    brand: { type: 'string' },
    mileage: { type: 'number' },
  },
  required: [],
  additionalProperties: false,
};

module.exports = carUpdateSchema;
