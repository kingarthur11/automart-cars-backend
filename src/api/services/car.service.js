const httpStatus = require('http-status');
const { Car } = require('../model');
const ApiError = require('../utils/ApiError');

const creat_car = async (carBody) => {
  const carData = await Car.create(carBody);
  return carData;
};


const get_all_car = async () => {
  return Car.find({});
};

const updatecar_image = async (_id, imageUrl) => {
  return Car.findOneAndUpdate({ _id }, { $set: { imageUrl } }, { new: true }, function(err, doc) {
  });
};

const delete_car = async (id) => {
    return Car.findByIdAndRemove(id);
  };


module.exports = {
    creat_car,
    get_all_car,
    updatecar_image,
    delete_car
};
