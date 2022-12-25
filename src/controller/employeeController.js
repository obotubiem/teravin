const resData = require("../helper/response");
const Joi = require("joi").extend(require("@joi/date"));

module.exports = {
  getAllEmployee: async (req, res, next) => {
    try {
      const limit = parseInt(req.query.record ?? 10);
      const page = parseInt(req.query.page ?? 1);

      const params = {
        ...req.query,
        page,
        limit,
      };
      const result = await req.employeeUC.getAllEmployee(params);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.message));
      }

      return res
        .status(result.statusCode)
        .json(
          resData.success({ data: result.data, pagination: result.pagination })
        );
    } catch (error) {
      next(error);
    }
  },

  getEmployeeById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await req.employeeUC.getEmployeeById(id);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.message));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },

  createEmployee: async (req, res, next) => {
    try {
      const request = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        birthDate: new Date(req.body.birthDate),
        addresses: req.body.addresses,
      };

      const schema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        mobile: Joi.string()
          .regex(/^[0-9]*$/)
          .required(),
        birthDate: Joi.date().format("YYYY-MM-DD").utc().required(),
        addresses: Joi.array().items(
          Joi.object({
            id: Joi.string(),
            address: Joi.string().required(),
            isDefault: Joi.boolean(),
          })
        ).min(1).required().label('Address'),
      });

      const { error } = schema.validate(req.body);
      console.log(error);
      if (error) {
        return res
          .status(422)
          .json(resData.failed(error.message, { details: error.details }));
      }

      const result = await req.employeeUC.createEmployee(request);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.message));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateEmployee: async (req, res, next) => {
    try {
      const { id } = req.params;
      const request = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        birthDate: new Date(req.body.birthDate),
        addresses: req.body.addresses,
      };

      const result = await req.employeeUC.updateEmployee(request, id);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.message));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },

  deleteEmployee: async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await req.employeeUC.deleteEmployee(id);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.message));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },
};
