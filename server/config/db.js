const mongoose = require("mongoose");
require("dotenv").config();

exports.connectToDb = async (req,res) =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to database...");
    } catch (error) {
        console.log(error);
    }
};