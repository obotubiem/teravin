const express = require('express');
const employeeController = require('../controller/employeeController');

const router = express.Router();
router.get('/employee',  employeeController.getAllEmployee);
router.get('/employee/:id', employeeController.getEmployeeById);
router.post('/employee', employeeController.createEmployee);
router.put('/employee/:id', employeeController.updateEmployee);
router.delete('/employee/:id', employeeController.deleteEmployee);

module.exports = router;