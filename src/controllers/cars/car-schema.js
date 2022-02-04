const carSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    color: { type: 'string' },
    make: { type: 'string' },
    model: { type: 'string' },
    brand: { type: 'string' },
    mileage: { type: 'string' },
  },
  required: ['id', 'color'],
  additionalProperties: false,
};

module.exports = carSchema;
