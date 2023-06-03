const express = require('express');
const router = express.Router();
const BloodBottle = require('../models/BloodBottles');

router.post('/', async (req, res) => {
  const { bloodType, count, unitPrice } = req.body;
    const existingRecord = await BloodBottle.findOne({ bloodType });
    if (existingRecord) {
        existingRecord.count = (parseInt(existingRecord.count) + parseInt(count)).toString();
        existingRecord.unitPrice = unitPrice;
        await existingRecord.save();
    } else {
        const newRecord = new BloodBottle({ bloodType, count, unitPrice });
        await newRecord.save();
    }
    res.sendStatus(200);
});

router.get('/', async (req, res) => {
  const records = await BloodBottle.find();
  res.json(records);
});

router.get("/:type", async (req, res) => {
  try {
    const bloodType = req.params.type;
    const bloodBottle = await BloodBottle.findOne({ bloodType });

    if (!bloodBottle) {
      return res.status(404).json({
        success: false,
        message: "Blood bottle not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blood bottle found successfully!",
      data: bloodBottle,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Failed to retrieve blood bottle",
    });
  }
});

router.put("/:type", async (req, res) => {
  try {
    const updatedBloodBottle = await BloodBottle.findOneAndUpdate(
      { bloodType: req.params.type },
      req.body,
      { new: true }
    );

    if (!updatedBloodBottle) {
      return res.status(404).json({
        success: false,
        message: "Blood bottle not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blood bottle data updated successfully!",
      data: updatedBloodBottle,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Failed to update blood bottle",
    });
  }
});

module.exports = router;