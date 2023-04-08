const mongoose = require("mongoose");
const AdminSchema = mongoose.Schema(
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
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
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
  },
);

module.exports = mongoose.model("Admin", AdminSchema);