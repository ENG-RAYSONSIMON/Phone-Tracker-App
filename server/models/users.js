const mongoose = require("mongoose");
 
 const userSchema = new mongoose.Schema({
   name: {
     type: String,
     required: true,
   },
   email: {
     type: String,
     required: true,
     match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
     unique: true,
   },
   password: {
     type: String,
     required: true,
     
   },
 });
 
 const User = mongoose.model("User", userSchema);
 
 module.exports = User;