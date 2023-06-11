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
  mobile: String,
  password: {
    type: String,
    required: true,
  },
  password2: String,

  img: {
    String,
    default: "",
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  adminAddress: {
    type: String,
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
  star: {
    type: Boolean,
    default: false,
  },
},
{ timestamps: true }
);

module.exports = mongoose.model("BloodBank", bankSchema);
