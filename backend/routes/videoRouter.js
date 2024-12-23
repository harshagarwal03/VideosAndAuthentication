const express = require("express");
const { getAllVideos } = require("../controllers/videoController");
// const { videoUpload } = require('../middleware/videoUpload');
const router = express.Router();
const videoController = require("../controllers/videoController");
const multer = require("multer");
const upload = multer({ dest: "" });

router.post("/upload", upload.single("video"), videoController.addVideo);
router.get("/videos", getAllVideos);

module.exports = router;
