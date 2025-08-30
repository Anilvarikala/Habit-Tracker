import React, { useState } from "react";
import "./Signup.css";
import axios from 'axios'
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
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
    const result = await axios.post(`${process.env.VITE_BACKEND_URL}/api/auth/signup`, formData)

     if(result.data.success === false){
       alert(result.data.message)
       return;
     }
     localStorage.setItem("AnilToken", result.data.token)
     localStorage.setItem("appId", result.data.appId)
     alert(result.data.message)
     window.location.href="/" 
    // later: send to backend API (fetch/axios)
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
