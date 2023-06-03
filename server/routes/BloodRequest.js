const router = require("express").Router();
const Request = require("../models/BloodRequest");


// Create a new notification
router.post("/", async (req, res) => {
    const request = new Request(req.body);
    try {
        const newRequest = await request.save();
        res.status(201).json(newRequest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all notifications
router.get("/", async (req, res) => {
    try {
        const requests = await Request.find();
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific notification by ID
router.get("/:id", getRequest, (req, res) => {
    res.json(res.request);
});

router.put("/markAsRead/:id", (req, res) => {
    Request.findByIdAndUpdate(
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
                message: "Request mark as read successfully!",
                data: obj,
            });
        }
    );
});

router.put("/changeStatus/:id", (req, res) => {
    Request.findByIdAndUpdate(
        { _id: req.params.id },
        { status: req.body.status },
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
                message: "Request status changed successfully!",
                data: obj,
            });
        }
    );
});

router.put("/giveBottles/:id", (req, res) => {
    Request.findByIdAndUpdate(
        { _id: req.params.id },
        { givenCount: req.body.bottles },
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
                message: "Bottles assigned successfully!",
                data: obj,
            });
        }
    );
});

router.put("/:id", (req, res) => {
    Request.findByIdAndUpdate(
        { _id: req.params.id },
        { donor_id: req.body.donorId },
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
                message: "Donor set successfully!",
                data: obj,
            });
        }
    );
});

// Delete a bank by ID
router.delete("/:id", getRequest, async (req, res) => {
    try {
        await res.request.remove();
        res.json({ message: "Request deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get a bank by ID
async function getRequest(req, res, next) {
    try {
        const request = await Request.findById(req.params.id);
        if (request == null) {
            return res.status(404).json({ message: "Request not found" });
        }
        res.request = request;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = router;