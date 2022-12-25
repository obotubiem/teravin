const express = require('express');
const addressController = require('../controller/addressController');

const router = express.Router();
router.get('/address',  addressController.getAllAddressByEmployeeId);
router.get('/address/:id', addressController.getMainAddressByEmployeeId);
router.post('/address', addressController.createAddress);
router.put('/address/:id', addressController.updateAddress);
router.delete('/address/:id', addressController.deleteAddress);

module.exports = router;