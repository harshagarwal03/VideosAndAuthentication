import React, { useState } from "react";
import axios from "axios";
import "../assets/UploadPage.css";

const UploadPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "video/mp4") {
      setFile(selectedFile);
    } else {
      alert("Only MP4 files are allowed!");
      e.target.value = null;
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", file);

    try {
      await axios.post("http://localhost:8000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });
      alert("Video uploaded successfully");
      setUploadProgress(0);
    } catch (error) {
      console.error("Failed to upload video", error);
      setUploadProgress(0);
    }
  };

  return (
    <div className="upload-page">
      <form className="upload-form" onSubmit={handleUpload}>
        <h2>Upload Video</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
        {uploadProgress > 0 && <p>Uploading: {uploadProgress}%</p>}
      </form>
    </div>
  );
};

export default UploadPage;
