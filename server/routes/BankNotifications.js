const router = require("express").Router();
const Notification = require("../models/bankNotifications");


// Create a new notification
router.post("/", async (req, res) => {
  const notification = new Notification(req.body);
  try {
    const newNotification = await notification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific notification by ID
router.get("/:id", getNotification, (req, res) => {
  res.json(res.notification);
});

router.put("/markAsRead/:id", (req, res) => {
  Notification.findByIdAndUpdate(
    { _id: req.params.id },
    { read: req.body.read },
    { new: true },
    (err, obj) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ message: "Failed to update ", success: false });
      }
      res.status(200).json({
        success: true,
        message: "Notification mark as read successfully!",
        data: obj,
      });
    }
  );
});

// Delete a bank by ID
router.delete("/:id", getNotification, async (req, res) => {
  try {
    await res.notification.remove();
    res.json({ message: "Notification deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a bank by ID
async function getNotification(req, res, next) {
  try {
    const notification = await Notification.findById(req.params.id);
    if (notification == null) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.notification = notification;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;