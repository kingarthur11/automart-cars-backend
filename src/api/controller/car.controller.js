const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { carService } = require("../services");
const dotenv = require("dotenv");
const { upload } = require("../middleware/uploadImage");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const createCar = catchAsync(async (req, res) => {
  const car = await carService.creatcar(req.body);
  res.status(httpStatus.CREATED).json({ message: "Created successfully", car });
});

module.exports = {
  createCar,
};
