const randomString = require("../library/randomString");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, `${randomString(16)}.${file.originalname.split(".")[1]}`);
    },
});
const uploadfile = multer({
  storage,
  limits: {
    fileSize: 2e6, // 2MB
  },
});
module.exports = uploadfile;
