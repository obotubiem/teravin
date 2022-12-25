class AddressUsecase {
  constructor(addressRepository, employeeRepository) {
    this.addressRepository = addressRepository;
    this.employeeRepository = employeeRepository;
  }

  async getAllAddressByEmployeeId(employeeId) {
    let result = {
      isSuccess: true,
      statusCode: null,
      message: null,
      data: [],
    };

    const employees = await this.addressRepository.getAll(employeeId);

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = employees.rows;
    result.pagination;

    return result;
  }

  async getMainAddressByEmployeeId(id) {
    let result = {
      isSuccess: false,
      statusCode: 404,
      message: null,
      data: null,
    };

    const employee = await this.employeeRepository.getById(id);
    if (employee === null) {
      result.isSuccess = false;
      result.message = "employee not found!";
      return result;
    }

    const address = await this.addressRepository.getMainByEmployeeId(id);

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = address;
    return result;
  }

  async createAddress(addressData) {
    let result = {
      isSuccess: false,
      statusCode: 400,
      message: null,
      data: null,
    };

    addressData.mainAddress = null;
    let verifyAddress = await this.addressRepository.getMainByEmployeeId(
      addressData.employeeId
    );
    if (verifyAddress !== null) {
      addressData.mainAddress = false;
    } else {
      addressData.mainAddress = true;
    }

    const address = await this.addressRepository.create(addressData);

    result.isSuccess = true;
    result.statusCode = 201;
    result.data = address;
    return result;
  }

  async updateAddress(data, id) {
    let result = {
      isSuccess: false,
      statusCode: 400,
      message: null,
      data: null,
    };

    const address = await this.addressRepository.getById(id);
    if (address === null) {
      result.isSuccess = false;
      result.message = "address not found!";
      return result;
    }

    await this.addressRepository.update(data, id);

    result.isSuccess = true;
    result.statusCode = 201;
    return result;
  }

  async deleteAddress(id) {
    let result = {
      isSuccess: false,
      statusCode: 400,
      message: null,
      data: null,
    };

    const address = await this.addressRepository.getById(id);
    if (address === null) {
      result.isSuccess = false;
      result.message = "address not found!";
      return result;
    }

    await this.addressRepository.delete(id);

    result.isSuccess = true;
    result.statusCode = 200;
    return result;
  }
}

module.exports = AddressUsecase;
