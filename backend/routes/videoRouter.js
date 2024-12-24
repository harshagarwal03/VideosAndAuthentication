const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");
const { videoUpload } = require("../middleware/videoMiddleware");

router.post("/upload", videoUpload.single("video"), videoController.addVideo);
router.get("/videos", videoController.getAllVideos);

module.exports = router;
