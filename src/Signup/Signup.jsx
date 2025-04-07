import React from "react";
import styles from "./Signup.module.css";

const Signup = () => {
    return (
        <div className={styles.signupbody}>
        <div className={styles.signup}>
            <h1 className={styles.signupheader}>SIGN UP!</h1>
            <div className={styles.signupdetailField}>
                <label>Name: </label>
                <input type="text" placeholder="Enter your name" />
            </div>
            <div className={styles.signupdetailField}>
                <label>Email-Id: </label>
                <input type="email" placeholder="Enter your email" />
            </div>
            <div className={styles.signupdetailField}>
                <label>Password: </label>
                <input type="password" />
            </div>
            <div className={styles.gender} >
                <label>Gender: </label>
                <div className={styles.radiobtn}>
                    <label>Male </label>
                    <input type="radio" name="myGender" />
                    <label>Female </label>
                    <input type="radio" name="myGender" />
                </div>
            </div>
            <div className={styles.submitbtn}>
            <button className={styles.btn17}>
                <span className={styles.textcontainer}>
                    <span className={styles.text}>SUBMIT</span>
                </span>
            </button>
            </div>
        </div>
        </div>
    );
}

export default Signup;
