const express = require("express");
const rootRouter = express.Router();

const employee = require("./employee_router");
const address = require("./address_router")


rootRouter.use("/", employee);
rootRouter.use("/", address);
module.exports = rootRouter;