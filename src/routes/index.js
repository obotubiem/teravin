const express = require("express");
const rootRouter = express.Router();

const employee = require("./employee_router");

rootRouter.use("/", employee);
module.exports = rootRouter;
