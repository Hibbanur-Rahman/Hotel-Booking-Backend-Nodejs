const mongoose = require("mongoose");

const RoomInfoSchema = new mongoose.Schema({
  hotelId: {
    type: mongoose.Types.ObjectId,
    ref: "Hotels",
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maxPeople: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
},{timestamps:true});

module.exports = mongoose.model("Rooms", RoomInfoSchema);
