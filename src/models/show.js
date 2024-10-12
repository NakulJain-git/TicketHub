const mongoose = require("mongoose");
const showSchema = new mongoose.Schema(
    {
        movieId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Movie",
            required:true,
        },
        cinemaId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Cinema",
            required:true,
        },
        cinemaHallId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"CinemaHall",
            required:true,
        },
        date:{
            type:Date,
            required:true,
        },
        startTime:{
            type:Date,
            required:true,
        },
        endTime:{
            type:Date,
            required:true,
        },
        seats:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Seat",
        }]
    },
    {
        timestamps: true,
    }
)
const Show = mongoose.model("Show", showSchema);
module.exports = { Show };