const Device = require('../models/devices');
const mongoose = require('mongoose');

exports.registerDevice = async (req, res) => {
    try {
        const { deviceId, name } = req.body;
        const owner = req.user._id;
        const location = [];

        const deviceExist = await Device.findOne({ deviceId: deviceId });

        if (deviceExist) {
            return res.status(400).json({ msg: 'device alredy exist!' });
        }

        const device = await Device.create({ deviceId, name, owner, location });

        res.status(201).json({ message: "Device registered successfully", device: device });
        
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};

//getting all devices of specific user
exports.getDevicesByOwner = async (req, res) => {
    try {
        const ownerId = new mongoose.Types.ObjectId(req.params.ownerId);
        const devices = await Device.find({ owner: ownerId });
        res.json(devices);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch devices" });
    }
};

exports.deleteDevice = async (req, res) => {
    try {
        const { id } = req.params;
        await Device.findByIdAndDelete(id);
        return res.status(200).json({ msg: "deleted" });
    }
    catch (error) {
        console.log(error);
    }
};
