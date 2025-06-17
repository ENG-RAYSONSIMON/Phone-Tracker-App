const userIsAuthenticatedMiddleware = require('../middlewares/authMiddleware');
const deviceController = require('../controllers/deviceController');
const express = require("express");
const deviceRouter = express.Router();

deviceRouter.post('/reg',
    userIsAuthenticatedMiddleware,
    deviceController.registerDevice
);

deviceRouter.get('/all/:ownerId',
    userIsAuthenticatedMiddleware,
    deviceController.getDevicesByOwner
)

deviceRouter.delete('/del/:id',
    userIsAuthenticatedMiddleware,
    deviceController.deleteDevice
)

module.exports = deviceRouter;