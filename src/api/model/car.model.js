const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const carSchema = mongoose.Schema(
  {
    _id: Number,
    name: {
        type: String,
        required: true,
        trim: true,
    },
    imageUrl: {
        type: String,
        required: false,
        default: null,
        trim: true,
    },
    is_active: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
    },
  },
  {
    timestamps: true,
  }
);

carSchema.plugin(AutoIncrement, {id: 'car_id', inc_field: '_id'});
const Car = mongoose.model('Car', carSchema);

module.exports = Car;
