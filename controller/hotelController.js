const httpStatusCode = require("../constants/httpStatusCode");
const hotelModel = require("../models/hotelModel");

const AddHotelListingInfo = async (req, res) => {
  try {
    const {
      name,
      categories,
      HotelKeywords,
      description,
      locality,
      socialLinks,
      menuItems,
      amenities,
      workingHours
    } = req.body;
    if (!name || !categories || !HotelKeywords || !description) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        message: "Please fill all the fields",
        status: httpStatusCode.BAD_REQUEST,
      });
    }
    const isHotelExisting = await hotelModel.findOne({ name });
    let hotel;
    if (!isHotelExisting) {
      hotel = await hotelModel.create({
        name,
        categories,
        HotelKeywords,
        description,
        locality,
        socialLinks,
        menuItems,
        amenities,
        workingHours
      });
    } else {
      hotel = await hotelModel.findOneAndUpdate(
        { name },
        {
          name,
          categories,
          HotelKeywords,
          description,
          locality,
          socialLinks,
          menuItems,
          amenities,
          workingHours
        }
      );
    }

    if (!hotel) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Something went wrong",
      });
    }

    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Hotel Listing Info added successfully",
      data: hotel,
    });
  } catch (error) {
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong!!",
      error: error.message,
    });
  }
};

module.exports = {
  AddHotelListingInfo,
};
