import React, { useState } from "react";
import styles from "./Signup.module.css";

import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, gender } = formData;
    if (!name || !email || !password || !gender) {
      alert("Please fill in all the fields.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        credentials: 'include', // Add this if you're using cookies
        body: JSON.stringify(formData),
      });

      // Check if the response is ok first
      if (!res.ok) {
        // Try to get error message if response is JSON
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await res.json();
          alert(errorData.message || `Signup failed: ${res.status}`);
        } else {
          // If not JSON, it might be HTML error page
          const errorText = await res.text();
          console.error('Server error:', errorText);
          alert(`Signup failed: ${res.status} - ${res.statusText}`);
        }
        return;
      }

      // Only parse JSON if response is ok
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        alert("Signup successful!");
        navigate("/");
      } else {
        // Handle case where server returns success but not JSON
        alert("Signup successful!");
        navigate("/");
      }

    } catch (error) {
      console.error("Network or parsing error:", error);
      
      // Check if it's a JSON parsing error
      if (error.message.includes('JSON')) {
        alert("Server response error. Please try again.");
      } else {
        // Network error or server unreachable
        alert("Network error. Please check your connection and try again.");
      }
    }
  };

  return (
    <div className={styles.signupbody}>
      <div className={styles.signup}>
        <h1 className={styles.signupheader}>SIGN UP!</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.signupdetailField}>
            <label>Name: </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.signupdetailField}>
            <label>Email-Id: </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.signupdetailField}>
            <label>Password: </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className={styles.gender}>
            <label>Gender: </label>
            <div className={styles.radiobtn}>
              <label>Male </label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              <label>Female </label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.submitbtn}>
            <button className={styles.btn17} type="submit">
              <span className={styles.textcontainer}>
                <span className={styles.text}>SUBMIT</span>
              </span>
            </button>
          </div>
          <div className={styles.message}>
            <p>Already have an account ?</p>
            <NavLink to="/login" className={styles.logininstead}>LOGIN NOW!</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;