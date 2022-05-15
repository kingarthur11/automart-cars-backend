const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { carService, upload } = require("../services");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const createCar = catchAsync(async (req, res) => {
  const car = await carService.creat_car(req.body);
  res.status(httpStatus.CREATED).json({ message: "Created successfully", car });
});

const getAllCar = catchAsync(async (req, res) => {
  const car = await carService.get_all_car();
  res.send(car);
});

const deleteCar = catchAsync(async (req, res) => {
  await carService.delete_car(req.params.car_id);
  res.json({ message: "Deleted successfully" });
});

const uploadCarImage = catchAsync(async (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      return res.send(err);
    }
    console.log(req.file);
    const path = req.file.path;
    const uniqueFilename = new Date().toISOString();
    cloudinary.uploader.upload(
      path,
      { public_id: `blog/${uniqueFilename}`, tags: `blog` },
      async function (err, image) {
        if (err) return res.send(err);
        console.log(image.url);
        await carService.updatecar_image(req.params.car_img_id, image.url);
        res.json(image);
      }
    );
  });
});

module.exports = {
  createCar,
  getAllCar,
  uploadCarImage,
  deleteCar
};
