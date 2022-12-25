"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmployeeAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmployeeAddress.init(
    {
      detailAddress: DataTypes.STRING,
      mainAddress: DataTypes.BOOLEAN,
      employeeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "EmployeeAddress",
      tableName: "employeeAddresses",
    }
  );
  return EmployeeAddress;
};
