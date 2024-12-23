import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/AuthPage.css";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        username,
        password,
      });
      login(response.data.token);
      navigate("/home");
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid credentials or user not found");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Video App</h1>
        <form className="auth-form" onSubmit={handleLogin}>
          <h2>Login</h2>
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
          <button type="submit">Login</button>
          <p>
            New user? <a href="/signup">Signup</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
