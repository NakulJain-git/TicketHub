const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log("Mongo DB connected!!!");
        console.log(`${process.env.PORT}`)
    }
    catch(error){
        console.log("Error Found:",error);
        process.exit(1);
    }
}
module.exports = connectDB;