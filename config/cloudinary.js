const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
// giving access to your cloudinary account
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
// cloudinary : SAAS platform : specialized in images hosting (tools : metadata, image analyzing ...)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "giftList",
  },
});

const uploader = multer({ storage });
// a middleware designed to parse file from requests and associate to req.file
// comment

module.exports = uploader;
