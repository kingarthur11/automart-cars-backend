const httpStatus = require('http-status');
const { Car } = require('../model');
const ApiError = require('../utils/ApiError');

const creatcar = async (carBody) => {
  const carData = await Car.create(carBody);
  return carData;
};


const get_all_car = async () => {
  return Car.find({});
};


module.exports = {
    creatcar,
    get_all_car
};
