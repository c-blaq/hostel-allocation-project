const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 5,
    max: 255,
    required: true,
  },
  email: {
    type: String,
    min: 5,
    max: 255,
    required: true,
    unique: 1,
  },
  phone: {
    type: String,
    min: 11,
    max: 15,
    required: true,
  },
  password: {
    type: String,
    min: 6,
    max: 1024,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

let User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    phone: Joi.string().min(11).max(15).required(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(user, {
    abortEarly: false,
  });
}

function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(user);
}
exports.User = User;
exports.validateUser = validateUser;
exports.validateLogin = validateLogin;
