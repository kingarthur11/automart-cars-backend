const express = require("express");
const carController = require("../../controller/car.controller");

const router = express.Router();

router.post("/create", carController.createCar);
router.get("/getall", carController.getAllCar);
router.delete("/delete/:car_id", carController.deleteCar);
router.put("/upload_car_image/:car_img_id", carController.uploadCarImage);

module.exports = router;
