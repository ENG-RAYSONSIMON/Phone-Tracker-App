const JWT = require('jsonwebtoken');
const User = require('../models/users');
require('dotenv').config();

const userIsAuthenticatedMiddleware = async (req, res, next) => {
    const token = req.headers['authorization']?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = userIsAuthenticatedMiddleware;