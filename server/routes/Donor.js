const router = require("express").Router();
const Donor = require("./../models/Donor");
const upload = require("./upload");

router.post("/donor", async (req, res) => {
  const newitem = new Donor(req.body);
  const _email = req.body.email
  const isDonorExist = await Donor.findOne({ email: _email });
  if(isDonorExist){
    return res.status(200).json({
      message: "Email Already Exist, Please sign in or use differnet email",
      error: true,
      data: null,
    });
  }
  newitem.save((err, obj) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "Error", error: err });
    }
    res.status(200).json({
      message: "Donor registered successfully!",
      data: obj,
      error: false,
    });
  });
});

router.get("/",(req,res)=>{
  Donor.find({},(err,doc)=>{
    if(err) {
      console.log(err);
      return res.status(400).json({ success : false,error:err,message:"Error failed"});
    }    
    res.status(200).json({
      success:true,
      data : doc
    });
  });
});

router.get("/get/:id",(req,res)=>{
  Donor.find({_id:req.params.id},(err,doc)=>{
    if(err) {
      console.log(err);
      return res.status(400).json({ success : false, error:err, message:"Error failed"});
    }
    res.status(200).json({
      success:true,
      data : doc
    });
  });
});

router.get("/:type", async (req, res) => {
  try {
    const bloodType = req.params.type;
    const donor = await Donor.findOne({ bloodType });

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Donor found successfully!",
      data: donor,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Failed to retrieve blood bottle",
    });
  }
});

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

router.delete("/delete/:id", (req, res) => {
  Donor.deleteOne({ _id: req.params.id }, (err, obj) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Failed to delete", success: false, err: err });
    }
    res.status(200).json({
      success: true,
      data: obj,
      message: "Donor Deleted succesfully",
    });
  });
});

router.put("/starDonor/:id", (req, res) => {
  Donor.findByIdAndUpdate(
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
        message: "Donor starred successfully!",
        data: obj,
      });
    }
  );
});

module.exports = router;