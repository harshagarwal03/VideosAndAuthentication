const express = require("express");
const app = express();
const cors = require("cors");
const { dbConnection } = require("./database/dbConnect");
const { readdirSync } = require("fs");
const path = require("path");
const VideoSchema = require("./models/VideoModel");
require("dotenv").config();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("uploadVideos"));

// Routes
readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/api/videos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const video = await VideoSchema.findById(id);
    if (!video) res.send({ msg: "Video not found" });

    const videoPath = path.join(__dirname, "uploadVideos", video.filename);
    res.sendFile(videoPath);
  } catch (error) {
    console.log(error);
    res.send({ error: "Unable to find Video" });
  }
});

const server = () => {
  dbConnection();
  app.listen(PORT, () => {
    console.log(`Server is listening to ${PORT}`);
  });
};

server();
