const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    DOB:{
      type:String,
      required:false
    },
    phone: {
      type: String,
      required: false,
    },
    profileImage: {
      type: String,
      required: false,
    },
    pincode: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state:{
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    wishlist:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'course'
      }
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
      },
    ],
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
