const mongoose = require("mongoose");
const AdminNotificationsSchema = mongoose.Schema(
  {
    bloodType: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("AdminNotifications", AdminNotificationsSchema);