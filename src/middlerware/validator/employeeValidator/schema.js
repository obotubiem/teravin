const Joi = require("joi");

const EmployeePayloadSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ tlds: { allow: false } }),  
  mobile: Joi.string().length(10).pattern(/^[0-9]+$/),
  birthDate : Joi.date().format('YYYY-MM-DD').required()

});

module.exports = { EmployeePayloadSchema };
