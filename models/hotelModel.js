const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    categories: {
      type: String,
      required: false,
    },
    HotelKeyword: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    imageHotel: {
      type: String,
      required: false,
    },
    amenities: [],
    workingHours: {
      Monday: {
        opening: String,
        closing: String,
      },
      Tuesday: {
        opening: String,
        closing: String,
      },
      Wednessday: {
        opening: String,
        closing: String,
      },
      Thursday: {
        opening: String,
        closing: String,
      },
      Friday: {
        opening: String,
        closing: String,
      },
      Saturday: {
        opening: String,
        closing: String,
      },
      Sunday: {
        opening: String,
        closing: String,
      },
    },
    socialLinks: {
      facebook: {
        type: String,
        required: false,
      },
      twitter: {
        type: String,
        required: false,
      },
      instagram: {
        type: String,
        required: false,
      },
      linkedin: {
        type: String,
        required: false,
      },
    },
    locality: {
      latitude: {
        type: Number,
        required: false,
      },
      longitude: {
        type: Number,
        required: false,
      },
      city: {
        type: String,
        required: false,
      },
      address: {
        type: String,
        required: false,
      },
      pin: {
        type: String,
        required: false,
      },
      state: {
        type: String,
        required: false,
      },
      mobile: {
        type: Number,
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
      website: {
        type: String,
        required: false,
      },
    },

    menuItems: [
      {
        ItemName: {
          type: String,
          required: false,
        },
        ItemCategory: {
          type: String,
          required: false,
        },
        ItemPrice: {
          type: Number,
          required: false,
        },
        ItemDescription: {
          type: String,
          required: false,
        },
      },
    ],

    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rooms",
      },
    ],
  },
  { timestamps: false }
);

module.exports = mongoose.model("Hotels", HotelSchema);
