const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./uploadVideos");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const videoUpload = multer({ storage });

module.exports = { videoUpload };
