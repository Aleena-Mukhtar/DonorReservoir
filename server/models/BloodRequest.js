const mongoose = require("mongoose");
const BloodRequestSchema = mongoose.Schema(
  {
    patient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    hospitalName: {
      type: String,
      required: true,
    },
    bloodType: {
      type: String,
      required: true,
    },
    count: {
      type: String,
      required: true,
    },
    days: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
      required: true,
    },
    status: {
      type: String,
      default: 'Pending',
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("BloodRequests", BloodRequestSchema);