const mongoose = require("mongoose");
const showSeatSchema = new mongoose.Schema(
    {   
        seatNo:{
            type:Number,
            required:true
        },
        status:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        showId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Show",
            required:true
        },
    },
    {
        timestamps:true
    }
)
const Seat = mongoose.model("Seat",showSeatSchema);
module.exports = {Seat};