const mongoose = require("mongoose");
const DonorSchema = mongoose.Schema(
  {
    img: {
      type: String,
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
    email: {
      type: String,
      required: true,
      unique: true,
    },
    bloodType: {
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
    star: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donor", DonorSchema);
