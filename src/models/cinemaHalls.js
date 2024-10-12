const mongoose = require("mongoose");
const cinemaHallSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        cinemaId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Cinema",
            required:true,
        }
    },
    {
        timestamps: true,
    }
)
const CinemaHall = mongoose.model("CinemaHall", cinemaHallSchema);
module.exports = {CinemaHall};