const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
var fs = require('fs');
var path = require('path');
const spacesEndpoint = new aws.Endpoint('fra1.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

aws.config.update({
    secretAccessKey: 'hAVx/gR83loFjGfNLL/ZUIrcjurrohCg9+E9eRxcPpM',
    accessKeyId: 'RM3G37LGW64VQWHMREQ7',
    region: "us-east-2",
  });



const upload = multer({

  storage: multerS3({
    s3: s3,
    bucket: 'jealla',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_METADATA" });
    },
    key: function (request, file, cb) {
        console.log(file);
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
  }),
});

module.exports = upload;