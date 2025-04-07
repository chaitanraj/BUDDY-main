import React from "react";
import styles from '../components/Card.module.css';


const Card = () => {
    return (
        <div className={styles.logincard}>
        <div className={styles.login}>
            <h1 className={styles.loginheader}>Enter Details</h1>
             {/* <div className={styles.detailField}>
                <label>Name: </label>
                <input type="text" placeholder="Enter your name" />
            </div>
            <div className={styles.detailField}>
                <label>Location: </label>
                <input type="text" placeholder="Enter your location" />
            </div>
            <div className={styles.detailField}>
                <label>Date: </label>
                <input type="date" />
            </div>
            <div className={styles.detailField}>
                <label>Time: </label>
                <input type="time" />
            </div>
            <div className={styles.gender} >
                <label>Gender: </label>
                <div className={styles.radiobtn}>
                    <label>Male </label>
                    <input type="radio" name="myGender" />
                    <label>Female </label>
                    <input type="radio" name="myGender" />
                </div>
            </div>        */}

            <div className={styles.detailField}>
                <label>Email-Id: </label>
                <input type="email" placeholder="Enter your email" />
            </div>
            <div className={styles.detailField}>
                <label>Password: </label>
                <input type="password" />
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

export default Card;
