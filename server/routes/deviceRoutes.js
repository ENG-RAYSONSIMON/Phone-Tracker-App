const userIsAuthenticatedMiddleware = require('../middlewares/authMiddleware');
const deviceController = require('../controllers/deviceController');
const express = require("express");
const router = express.Router();

router.post('/reg',
    userIsAuthenticatedMiddleware,
    deviceController.registerDevice
);

router.get('/all/:ownerId',
    userIsAuthenticatedMiddleware,
    deviceController.getDevicesByOwner
)

router.delete('/del/:id',
    userIsAuthenticatedMiddleware,
    deviceController.deleteDevice
)

module.exports = router;