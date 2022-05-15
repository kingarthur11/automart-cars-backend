const httpStatus = require('http-status');
const { Car } = require('../model');
const ApiError = require('../utils/ApiError');

const creatcar = async (carBody) => {
  const carData = await Car.create(carBody);
  return carData;
};


module.exports = {
    creatcar,
};
