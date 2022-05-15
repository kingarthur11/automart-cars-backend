const express = require("express");
const carController = require("../../controller/car.controller");

const router = express.Router();

router.post("/create", carController.createCar);

module.exports = router;
