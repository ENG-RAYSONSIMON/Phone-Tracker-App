require("dotenv").config();
const JWT = require("jsonwebtoken");

const generateAccessToken = (payload) => {
    return JWT.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "15m",
    });
};

module.exports = {
    generateAccessToken,
};