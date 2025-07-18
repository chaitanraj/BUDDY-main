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
      console.log("API URL →", import.meta.env.VITE_API_URL);
      // const res = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Signup successful!");
        navigate("/");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
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
