const { Op, Sequelize } = require("sequelize");

class EmployeeUseCase {
  constructor(employeeRepository, addressRepository) {
    this.employeeRepository = employeeRepository;
    this.addressRepository = addressRepository;
  }

  async getAllEmployee(params) {
    const result = {
      isSuccess: true,
      statusCode: null,
      message: null,
      data: [],
      pagination: {},
    };

    const page = params.page ?? 1;
    const limit = parseInt(params.limit ?? 10);
    const offset = parseInt((page - 1) * limit);
    const include = ["addresses"];
    const orderBy = params.orderBy ?? "createdAt";
    const orderDirection = params.orderDir ?? "DESC";

    const order = [[orderBy, orderDirection]];
    const employees = await this.employeeRepository.getAll(params, {
      offset,
      limit,
      order,
      include,
    });

    const start = 0 + (page - 1) * limit;
    const end = page * limit;
    const countFiltered = employees.count;

    result.pagination = {
      totalRow: employees.count,
      totalPage: Math.ceil(countFiltered / limit),
      page,
      limit,
    };

    if (end < countFiltered) {
      result.pagination.next = {
        page: page + 1,
      };
    }

    if (start > 0) {
      result.pagination.prev = {
        page: page - 1,
      };
    }

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = employees.rows;

    return result;
  }

  async getEmployeeById(id) {
    const result = {
      isSuccess: false,
      statusCode: 404,
      message: null,
      data: null,
    };

    const include = ["addresses"];
    const employee = await this.employeeRepository.getById(id, { include });

    if (employee === null) {
      result.statusCode = 404;
      result.isSuccess = false;
      result.message = "employee not found!";
      return result;
    }

    const data = employee;

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = data;
    return result;
  }

  async createEmployee(request) {
    const result = {
      isSuccess: false,
      statusCode: 400,
      message: null,
      data: null,
    };

    const lastRow = await this.employeeRepository.getLastRow({
      date: Sequelize.where(
        Sequelize.fn("date_part", "year", Sequelize.col("createdAt")),
        2022
      ),
      [Op.and]: Sequelize.where(
        Sequelize.fn("date_part", "month", Sequelize.col("createdAt")),
        12
      ),
    });

    let yearDate = new Date().toISOString().split("T")[0].slice(2).split("-");
    let newId = `${yearDate[0]}${yearDate[1]}00001`;

    if (lastRow) {
      let newNumber = parseInt(lastRow.id.substring(4)) + 1;
      newNumber = (newNumber + "").padStart(4, "0");
      newId = `${yearDate[0]}${yearDate[1]}${newNumber}`;
    }

    request.id = newId;

    const employee = await this.employeeRepository.create(request);

    if (request.addresses && request.addresses.length > 0) {
      const checkDefault = request.addresses.find((o) => o.isDefault === true);
      if (!checkDefault) {
        request.addresses[0].isDefault = true;
      }
      for (const reqAddress of request.addresses) {
        reqAddress.employeeId = employee.id;
        await this.addressRepository.create(reqAddress);
      }
    }

    const addresses = await employee.getAddresses();

    const data = {
      employee,
      addresses,
    };

    result.isSuccess = true;
    result.statusCode = 201;
    result.data = data;
    return result;
  }

  async updateEmployee(request, id) {
    const result = {
      isSuccess: false,
      statusCode: 400,
      message: null,
      data: null,
    };

    const employee = await this.employeeRepository.getById(id);
    if (employee === null) {
      result.statusCode = 404;
      result.isSuccess = false;
      result.message = "employee not found!";
      return result;
    }

    await this.employeeRepository.update(request, id);

    if (request.addresses) {
      const checkDefault = request.addresses.find((o) => o.isDefault === true);
      if (!checkDefault) {
        request.addresses[0].isDefault = true;
      }

      // Remove other id
      const existAddressIds = request.addresses
        .filter((o) => o.id)
        .map((o) => o.id);

      if (existAddressIds.length) {
        await this.addressRepository.delete({
          [Op.and]: [
            {
              employeeId: employee.id,
              id: {
                [Op.notIn]: existAddressIds,
              },
            },
          ],
        });
      }

      for (const reqAddress of request.addresses) {
        reqAddress.employeeId = employee.id;
        if (reqAddress.id) {
          await this.addressRepository.update(reqAddress, reqAddress.id);
        } else {
          await this.addressRepository.create(reqAddress);
        }
      }
    }

    result.isSuccess = true;
    result.statusCode = 201;
    return result;
  }

  async deleteEmployee(id) {
    let result = {
      isSuccess: false,
      statusCode: 400,
      message: null,
      data: null,
    };

    const employee = await this.employeeRepository.getById(id);
    if (employee === null) {
      result.statusCode = 404;
      result.isSuccess = false;
      result.message = "employee not found!";
      return result;
    }
    await employee.destroy();

    result.isSuccess = true;
    result.statusCode = 200;
    return result;
  }
}

module.exports = EmployeeUseCase;
