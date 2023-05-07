const mongoose = require("mongoose");
const BottleSchema = mongoose.Schema(
  {
    bloodType: {
      type: String,
      required: true,
    },
    count: {
      type: String,
      required: true,
    },
    unitPrice: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model("BloodBottle", BottleSchema);