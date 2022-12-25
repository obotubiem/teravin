const resData = require("../helper/response");

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
      const employee = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        birthDate: new Date(req.body.birthDate),
      };

      const result = await req.employeeUC.createEmployee(employee);

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

  updateEmployee: async (req, res, next) => {
    try {
      const { id } = req.params;
      const employee = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        birthDate: new Date(req.body.birthDate),
      };

      const result = await req.employeeUC.updateEmployee(employee, id);

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
