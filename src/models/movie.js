const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        durationInMins:{
            type:Number,
            required:true,
        },
        releaseDate:{
            type:Date,
            required:true,
        },
        language:{
            type:String,
            required:true,
        },
        genre:{
            type:String,
            required:true,
        }
    },
    {
        timestamps: true,
    }
)
const Movie = mongoose.model("Movie",movieSchema);
module.exports = {Movie};
