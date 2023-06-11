const router = require("express").Router();
const Bank = require("../models/BloodBank");
const upload = require("./upload");


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

router.post("/login", (req, res) => {
  Bank.findOne({email: req.body.email},(err,admin)=> {
      if(err) {
        console.log(err);
        return res.status(400).json({message:"Failed to Login" ,success : false});
      }
      if (!admin) {
          return res.status(201).json({
              message: "Invalid Email",
              error: true,
              data: null,
          });
      }
      if(admin.password !== req.body.password){
          return res.status(201).json({
              message: "Invalid Password",
              error: true,
              data: null,
          });
      }
      return res.status(200).json({
          userData: admin,
          success:true,
          error:false,
          message:"Login Successful"
      });
  });
});

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

router.put("/starBank/:id", (req, res) => {
  Bank.findByIdAndUpdate(
    { _id: req.params.id },
    { star: req.body.star },
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
        message: "Bank starred successfully!",
        data: obj,
      });
    }
  );
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
router.put("/edit/:id",(req,res)=>{
  Bank.findByIdAndUpdate(
    {_id:req.params.id},
    req.body,
    {new:true},
    (err,obj) => {
    if(err) {
      console.log(err);
      return res.status(400).json({message:"Failed to update " ,success : false});
    }
    res.status(200).json({
      success:true,
      message :"Account Updated successfully!",
      data : obj
    });
  });
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

router.post("/upload", (req, res) => {
  const singleUpload = upload.single("file");
  singleUpload(req, res, function (err, doc) {
    if (err) {
      return res.status(201).json({
        success: false,
        errors: {
          title: "Image Upload Error",
          detail: err.message,
          error: err,
        },
      });
    }
    const url = req.protocol + "://" + req.get("host");

    const x = url + "/uploads/" + req.file.filename;
    res.status(200).json({
      success: true,
      url: x,
    });
  });
});

module.exports = router;
