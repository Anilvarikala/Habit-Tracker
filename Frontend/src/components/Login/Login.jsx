import React, { useState } from "react";
import "./Login.css";
import axios from 'axios'
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User Signup Data:", formData);
    const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, formData)

     if(result.data.success === false){
       alert(result.data.message)
       return;
     }
     localStorage.setItem("appId", result.data.appId)
     localStorage.setItem("AnilToken", result.data.token)
     alert(result.data.message)
     window.location.href="/" 
    // later: send to backend API (fetch/axios)
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Login to Account</h2>

        
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
        <a href="/signup">Don't have an account ? </a>
      </form>
    </div>
  );
};

export default Login
