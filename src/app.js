require("dotenv").config();

const express = require("express");
const cors = require("cors");
const serverError = require("./middlerware/serverError");
const rootRouter = require("./routes/index");

const EmployeeRepository = require("./repository/employeeRepository");
const AddressRepository = require("./repository/addressRepository");
const EmployeeUseCase = require("./usecase/employee_usecase");

const employeeUC = new EmployeeUseCase(
  new EmployeeRepository(),
  new AddressRepository()
);

const app = express();

app.use((req, res, next) => {
  req.employeeUC = employeeUC;
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.use("/api/v1", rootRouter);

app.get("/home", (req, res) => {
  res.render("home");
});

app.use(serverError);

module.exports = app;
