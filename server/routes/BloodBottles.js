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

router.put("/:type",(req,res)=>{
  Admin.findByIdAndUpdate(
    {bloodType: req.params.type},
    req.body,
    {new:true},
    (err,obj) => {
    if(err) {
      console.log(err);
      return res.status(400).json({message:"Failed to update " ,success : false});
    }
    res.status(200).json({
      success:true,
      message :"Bottles data Updated successfully!",
      data : obj
    });
  });
});

module.exports = router;


module.exports = router;