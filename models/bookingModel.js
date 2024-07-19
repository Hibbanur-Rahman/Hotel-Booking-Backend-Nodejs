const mongoose=require('mongoose');

const BookingInfoSchema=new mongoose.Schema({
    roomId:{
        type:String,
        required:true,
    },
    userId:{
        type : String,
        required: true,
    },
    fromDate:{
        type:Date,
        required: true,
    },
    toDate:{
        type:Date,
        required: true,
    },
    bookingStatus:{
        type:String,
        required: true,
    },

});

module.exports=mongoose.model('bookingInfo',BookingInfoSchema);