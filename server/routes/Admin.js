const router = require("express").Router();
const Admin = require("../models/Admin");
const upload = require("./upload");

router.post("/login", (req, res) => {
    Admin.findOne({email: req.body.email},(err,admin)=> {
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

router.get("/get/:id",(req,res)=>{
  Admin.find({_id:req.params.id},(err,doc)=>{
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

router.delete("/delete/:id", (req, res) => {
  Admin.deleteOne({ _id: req.params.id }, (err, obj) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Failed to delete", success: false, err: err });
    }
    res.status(200).json({
      success: true,
      data: obj,
      message: "Admin Deleted succesfully",
    });
  });
});

router.put("/edit/:id",(req,res)=>{
  Admin.findByIdAndUpdate(
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

module.exports = router;