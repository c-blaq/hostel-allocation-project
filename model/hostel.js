const mongoose = require("mongoose");
const Joi = require("joi");

const hostelSchema = new mongoose.Schema({
  hostelName: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  location: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  price: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  description: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  numberOfBedroom: {
    type: Number,
    min: 1,
    max: 255,
    required: true,
  },
  numberOfKitchen: {
    type: Number,
    min: 1,
    max: 255,
    required: true,
  },
  numberOfToilet: {
    type: Number,
    min: 1,
    max: 255,
    required: true,
  },
  numberOfRooms: {
    type: Number,
    min: 1,
    max: 255,
    required: true,
  },
  availableRooms: {
    type: Number,
    min: 1,
    max: 255,
    required: true,
  },
  dateOut: { type: Date, default: Date.now() },
});

let Hostel = mongoose.model("Hostel", hostelSchema);

function validateHostel(hostel) {
  const schema = Joi.object({
    hostelName: Joi.string().min(3).max(255).required(),
    location: Joi.string().min(3).max(255).required(),
    price: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(3).max(255).required(),
    numberOfBedroom: Joi.number().min(1).max(255).required(),
    numberOfKitchen: Joi.number().min(1).max(255).required(),
    numberOfToilet: Joi.number().min(1).max(15).required(),
    numberOfRooms: Joi.number().min(1).max(255).required(),
    availableRooms: Joi.number().min(1).max(255).required(),
  });

  return schema.validate(hostel, {
    abortEarly: false,
  });
}

module.exports.Hostel = Hostel;
module.exports.validateHostel = validateHostel;
