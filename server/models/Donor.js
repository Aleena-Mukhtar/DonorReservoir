const mongoose = require("mongoose");
const DonorSchema = mongoose.Schema(
  {
    // donor_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    // //   ref: "User",
    // },
    img: {
      type: String,
      required: true,
    },
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    bloodType: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    phone2: {
      type: String
    },
    CNIC: {
      type: String,
      required: true,
    },
    // searchTags: {
    //   type: [String],
    // },
    // address: {
    //   type: String,
    //   minlength: 90,
    //   required: true,
    // },
    // individual: {
    //   type: {
    //     name: {
    //       type: String,
    //     },
    //     description: {
    //       type: String,
    //     },
    //     delivery: {
    //       type: String,
    //     },
    //     number_of_students: {
    //       type: Number,
    //       default: 1,
    //     },
    //     min_to_max: {
    //       type: Boolean,
    //       default: false,
    //     },
    //     questionWriting: {
    //       type: Boolean,
    //       default: false,
    //     },
    //     customBranding: {
    //       type: Boolean,
    //       default: false,
    //     },
    //     surveryLogic: {
    //       type: Boolean,
    //       default: false,
    //     },
    //     price: {
    //       type: Number,
    //     },
    //   },
    // },
    // group: {
    //   type: {
    //     name: {
    //       type: String,
    //     },
    //     description: {
    //       type: String,
    //     },
    //     delivery: {
    //       type: String,
    //     },
    //     delivery: {
    //       type: String,
    //     },
    //     number_of_students: {
    //       min: {
    //         type: Number,
    //       },
    //       max: {
    //         type: Number,
    //       },
    //     },
    //     min_to_max: {
    //       type: Boolean,
    //       default: false,
    //     },
    //     questionWriting: {
    //       type: Boolean,
    //       default: false,
    //     },
    //     customBranding: {
    //       type: Boolean,
    //       default: false,
    //     },
    //     surveryLogic: {
    //       type: Boolean,
    //       default: false,
    //     },
    //     price: {
    //       type: Number,
    //     },
    //   },
    // },
    // additionalQuestion: {
    //   type: Boolean,
    //   default: false,
    // },
    // extraFast: {
    //   type: Boolean,
    //   default: false,
    // },
    // surveryLogic: {
    //   type: Boolean,
    //   default: false,
    // },
    // question: {
    //   type: [
    //     {
    //       description: {
    //         type: String,
    //       },
    //       form: {
    //         type: String,
    //       },
    //       required: {
    //         type: Boolean,
    //         default: false,
    //       },
    //     },
    //   ],
    // },
    // video: {
    //   type: String,
    // },
    // imgs: {
    //   type: [String],
    // },
    // audios: {
    //   type: [String],
    // },
    // pdfs: {
    //   type: [String],
    // },
    // rating: {
    //   type: [
    //     {
    //       student_id: String,
    //       rate: Number,
    //       message: String,
    //     },
    //   ],
    // },
    // is_verified: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donor", DonorSchema);
