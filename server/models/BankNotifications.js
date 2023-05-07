const mongoose = require("mongoose");
const BankNotificationsSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: true,
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
  },
  reply: {
    type: {
      read: {
        type: Boolean,
        default: false,
      },
      unitPrice: {
        type: String,
      },
      discount: {
        type: String,
      },
      shipping: {
        type: String,
      },
    },
  },
},
{ timestamps: true }
);

module.exports = mongoose.model("BankNotifications", BankNotificationsSchema);