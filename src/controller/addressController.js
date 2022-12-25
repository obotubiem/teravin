const resData = require("../helper/response");

module.exports = {
  getAllAddressByEmployeeId: async (req, res, next) => {
    try {
      let limit = parseInt(req.query.record);
      let page = parseInt(req.query.page);
     
      const result = await req.addressUC.ggetAllAddressByEmployeeId(limit, page);

      return res.status(result.statusCode).json(resData.success({data: result.data, pagination: result.pagination}));
    } catch (error) {
      next(error);
    }
  },

  getMainAddressByEmployeeId: async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await req.addressUC.getMainAddressByEmployeeId(id);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },

  createAddress: async (req, res, next) => {
    try {
      const address = {
        detailAddress: req.body.detailAddress,
        mainAddress: true,
        employeeId: req.body.employeeId,
      };

      const result = await req.addressUC.createAddress(address);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },
  updateAddress: async (req, res, next) => {
    try {
      const { id } = req.params;
      const address = {
        detailAddress: req.body.firstName,
        mainAddress: true,
        employeeId: req.body.employeeId,
      };

      const result = await req.addressUC.updateAddress(address, id);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },

  deleteAddress: async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await req.addressUC.deleteAddress(id);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },
};