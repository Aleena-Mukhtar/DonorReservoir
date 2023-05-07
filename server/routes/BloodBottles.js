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

module.exports = router;


module.exports = router;