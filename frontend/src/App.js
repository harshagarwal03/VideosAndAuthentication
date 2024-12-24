import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import VideoPage from "./Pages/VideoPage";
import UploadPage from "./Pages/UploadPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/videos"
          element={isAuthenticated ? <VideoPage /> : <Navigate to="/" />}
        />
        <Route
          path="/upload"
          element={isAuthenticated ? <UploadPage /> : <Navigate to="/" />}
        />
      </Routes>
      {isAuthenticated && <Footer />}
    </Router>
  );
};

export default App;
