import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../assets/AuthPage.css";
import { toast } from "react-toastify";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/signup", {
        username,
        password,
      });
      login(response.data.token);
      navigate("/home");
      toast.success("Signup successful");
    } catch (error) {
      console.error("Signup failed", error);
      if (
        error.response &&
        error.response.data.message === "User already exists"
      ) {
        toast.error("User already exists");
      } else {
        toast.error("Signup failed");
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Video App</h1>
        <form className="auth-form" onSubmit={handleSignup}>
          <h2>Signup</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Signup</button>
          <p>
            Already have an account? <a href="/">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
