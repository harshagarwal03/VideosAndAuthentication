import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/VideoPage.css";

const VideoPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/videos");
        setVideos(response.data.videos);
      } catch (error) {
        console.error("Failed to fetch videos", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="video-page">
      <h2>My Videos</h2>
      <div className="video-list">
        {videos.map((video) => (
          <div key={video._id} className="video-item">
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <video width="400" controls>
              <source src={`http://localhost:8000/api/videos/${video._id}`} />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPage;
