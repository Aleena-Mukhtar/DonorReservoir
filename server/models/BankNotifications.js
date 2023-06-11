const mongoose = require("mongoose");
const BankNotificationsSchema = new mongoose.Schema({
  bank_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BloodBank",
    default: null,
  },
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
  status: {
    type: String,
    default: 'Pending',
  },
  read: {
    type: Boolean,
    default: false,
  },
  adminRead: {
    type: Boolean,
    default: false,
  },
  bankRead: {
    type: Boolean,
    default: false,
  },
  adminReplyRead: {
    type: Boolean,
    default: false,
  },
  bankReplyRead: {
    type: Boolean,
    default: false,
  },
  reply: {
    type: {
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