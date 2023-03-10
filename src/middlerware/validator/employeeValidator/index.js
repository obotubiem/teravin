const { EmployeePayloadSchema } = require('./schema');
const resData = require('../../../helper/response');

const EmployeePayloadValidator = {
  validatorDoctorValidation: async (req, res, next) => {
    const validationResult = EmployeePayloadSchema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json(resData.failed(validationResult.error.details[0].message));
    }

    next();
  },
};

module.exports = EmployeePayloadValidator 