const { EmployeeAddress } = require("../models");

class AddressRepository {
  constructor() {
    this.addressModel = EmployeeAddress;
  }

  async getAll() {
    const result = await this.addressModel.findAndCountAll();
    return result;
  }

  async getMainByEmployeeId(employeeId) {
    const result = await this.addressModel.findOne({
      where: {
        employeeId,
        mainAddress: true,
      },
    });
    return result;
  }

  async getByEmployeeId(employeeId) {
    const result = await this.addressModel.findOne({
      where: {
        employeeId,
      },
    });
    return result;
  }

  async create(data) {
    const result = await this.addressModel.create(data);
    return result;
  }

  async update(data, id) {
    const result = await this.addressModel.update(data, {
      where: {
        id,
      },
    });
    return result;
  }

  async delete(condition) {
    await this.addressModel.destroy({
      where: condition,
    });
  }
}

module.exports = AddressRepository;
