import React, { useState } from "react";
import styles from '../components/Card.module.css';

const Card = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                alert('Login successful!');
                console.log(data);
                // maybe redirect or save token here
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Server error');
        }
    };
    return (
        <div className={styles.logincard}>
        <div className={styles.login}>
            <h1 className={styles.loginheader}>Enter Details</h1>  
            {/* <div className={styles.detailField}>
                <label>Location: </label>
                <input type="text" placeholder="Enter your location" />
            </div> */}
             {/* <div className={styles.detailField}>
                <label>Name: </label>
                <input type="text" placeholder="Enter your name" />
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
