const router = require("express").Router();
const Bank = require("../models/BloodBank");
const upload = require("./upload");

// Get all banks
router.get("/", async (req, res) => {
  try {
    const banks = await Bank.find();
    res.json(banks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific bank by ID
router.get("/:id", getBank, (req, res) => {
  res.json(res.bank);
});

// Create a new bank
router.post("/", async (req, res) => {
  const bank = new Bank(req.body);

  try {
    const newBank = await bank.save();
    res.status(201).json(newBank);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a bank by ID
router.delete("/:id", getBank, async (req, res) => {
  try {
    await res.bank.remove();
    res.json({ message: "Bank deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a bank by ID
router.patch("/:id", getBank, async (req, res) => {
  if (req.body.bankName != null) {
    res.bank.bankName = req.body.bankName;
  }

  if (req.body.city != null) {
    res.bank.city = req.body.city;
  }

  // Update other fields as necessary

  try {
    const updatedBank = await res.bank.save();
    res.json(updatedBank);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware function to get a bank by ID
async function getBank(req, res, next) {
  try {
    const bank = await Bank.findById(req.params.id);
    if (bank == null) {
      return res.status(404).json({ message: "Bank not found" });
    }
    res.bank = bank;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
