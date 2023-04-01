const mongoose = require("mongoose");
const bankSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  phone2: String,
  password: {
    type: String,
    required: true,
  },
  password2: String,

  adminImg: String,
  adminFname: {
    type: String,
    required: true,
  },
  adminLname: {
    type: String,
    required: true,
  },
  adminAddress: {
    type: String,
    required: true,
  },
  adminEmail: {
    type: String,
    required: true,
    unique: true,
  },
  adminPhone: {
    type: String,
    required: true,
  },
  adminCNIC: {
    type: String,
    required: true,
  },

  bloodTypes: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("BloodBank", bankSchema);
