const mongoose = require("mongoose");

const facitiliesSchema = new mongoose.Schema({
  bedroom: String,
  kitchen: String,
  restroom: String,
});

const hostelSchema = new mongoose.Schema({
  name: String,
  location: String,
  about: facitiliesSchema,
  numberOfRooms: Number,
  availableRooms: Number,
  price: String,
  dateOut: { type: Date, default: Date.now() },
});

let Hostel = mongoose.model("Hostel", hostelSchema);

module.exports = Hostel;
