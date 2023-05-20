const router = require("express").Router();
const Patient = require("./../models/Patient");
const upload = require("./upload");

router.post("/login", (req, res) => {
    Patient.findOne({email: req.body.email},(err,patient)=> {
        if(err) {console.log(err);
            return res.status(400).json({message:"Failed to Login" ,success : false});}
        if (!patient) {
            return res.status(201).json({
                message: "Invalid Email",
                error: true,
                data: null,
            });
        }
        if(patient.password !== req.body.password){
            return res.status(201).json({
                message: "Invalid Password",
                error: true,
                data: null,
            });
        }
        return res.status(200).json({
            userData: patient,
            success:true,
            error:false,
            message:"Login Successful"
        });
    });
});

router.post("/", async (req, res) => {
    const newitem = new Patient(req.body);
    const _email = req.body.email
    const isPatientExist = await Patient.findOne({ email: _email });
    if(isPatientExist){
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
            message: "Patient registered successfully!",
            data: obj,
            error: false,
        });
    });
});

router.get("/",(req,res)=>{
    Patient.find({},(err,doc)=>{
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

router.get("/:id",(req,res)=>{
    Patient.find({_id:req.params.id},(err,doc)=>{
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

router.delete("/:id", (req, res) => {
    Patient.deleteOne({ _id: req.params.id }, (err, obj) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Failed to delete", success: false, err: err });
    }
    res.status(200).json({
        success: true,
        data: obj,
        message: "Patient Deleted succesfully",
    });
  });
});

router.put("/starPatient/:id", (req, res) => {
    Patient.findByIdAndUpdate(
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
                message: "Patient starred successfully!",
                data: obj,
            });
        }
    );
});

router.put("/:id",(req,res)=>{
    Patient.findByIdAndUpdate(
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
// router.put("/starDonor/:id", (req, res) => {
//   Donor.findByIdAndUpdate(
//     { _id: req.params.id },
//     { star: req.body.star },
//     { new: true },
//     (err, obj) => {
//       if (err) {
//         console.log(err);
//         return res
//           .status(400)
//           .json({ message: "Failed to update ", success: false });
//       }
//       res.status(200).json({
//         success: true,
//         message: "Donor starred successfully!",
//         data: obj,
//       });
//     }
//   );
// });

module.exports = router;