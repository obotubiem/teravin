const { Op } = require("sequelize");
const { Employee } = require("../models");

class EmployeeRepository {
  constructor() {
    this.employeeModel = Employee;
  }

  async getAll(params, options) {
    const filters = {};

    if (params) {
      const search = params.q;
      if (search) {
        filters[Op.or] = [
          {
            id: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${search}%`,
            },
          },
        ];
      }
    }

    const result = await this.employeeModel.findAndCountAll({
      where: filters,
      ...options,
    });

    return result;
  }

  async getById(id, options = {}) {
    const result = await this.employeeModel.findOne({
      where: {
        id,
      },
      ...options,
    });
    return result;
  }

  async getLastRow(params) {
    return await this.employeeModel.findOne({
      where: params,
      order: [["createdAt", "desc"]],
    });
  }

  async update(data, id) {
    const result = await this.employeeModel.update(data, {
      where: {
        id,
      },
    });
    return result;
  }

  async create(data) {
    const result = await this.employeeModel.create(data);
    return result;
  }
}

module.exports = EmployeeRepository;
