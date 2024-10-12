const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema(
    {
        numberOfSeats:{
            type:Number,
            required:true,
        },
        bookingStatus:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:true
        },
        seatIds:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Seat",
            required:true,
        }],
        showId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Show",
            required:true,
        }  
    }
    ,{
        timestamps:true
    }
)
const Booking = mongoose.model("Booking",bookingSchema);  
module.exports = {Booking};