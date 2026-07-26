const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
var fs = require('fs');
var path = require('path');
const spacesEndpoint = new aws.Endpoint(process.env.DO_SPACES_ENDPOINT);
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.DO_SPACES_REGION,
  });



const upload = multer({

  storage: multerS3({
    s3: s3,
    bucket: process.env.DO_SPACES_BUCKET,
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