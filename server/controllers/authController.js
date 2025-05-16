 const User = require("../models/users");
 const bcrypt = require("bcryptjs");
 const JWT = require("jsonwebtoken");
 require("dotenv").config();
 
 exports.register = async (req, res) => {
   const { name, email, password } = req.body;
   const user = await User.findOne({ email: email });
   if (user) {
     return res.status(200).json({ message: "user exist." });
   } else {
     const newUser = await User.create({
       name: name,
       email: email,
       password: await bcrypt.hash(password, 10),
     });
     return res.status(200).json({ message: newUser });
   }
 };
 
 exports.login = async (req, res) => {
   //array distructuring
   const { email, password } = req.body;
   //get user by input emails
   const user = await User.findOne({ email: email });
   //if no email in database
   if (!user) {
     return res
       .status(400)
       .json({ message: "No user found with given credentials" });
   }
   //comparing passwords
   const passwordMatches = await bcrypt.compare(password, user.password);
 
   if (!passwordMatches)
     return res.status(400).json({ message: "invalid email or password" });
 
   // creating a payload
   const payload = {
     id: user._id,
     name: user.name,
   };
   
   //creating a jwt token
   const token = JWT.sign(payload, process.env.JWT_SECRET_KEY, {
     expiresIn: "1d",
   });
 
   return res.status(200).json({ token: token });
 };