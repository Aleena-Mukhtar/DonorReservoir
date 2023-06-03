const mongoose = require("mongoose");
const BloodRequestSchema = mongoose.Schema(
  {
    patient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    donor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor",
      default: null,
    },
    hospitalName: {
      type: String,
      required: true,
    },
    bloodType: {
      type: String,
      required: true,
    },
    givenCount: {
      type: String,
      required: true,
      default: '0',
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
    price: {
      type: String,
      default: '0',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("BloodRequests", BloodRequestSchema);