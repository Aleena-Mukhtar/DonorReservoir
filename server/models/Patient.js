const mongoose = require("mongoose");
const PatientSchema = mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    phone2: {
      type: String
    },
    CNIC: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    password2: {
      type: String,
      required: true,
    },
    star: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", PatientSchema);