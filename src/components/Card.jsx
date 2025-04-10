import React, { useState } from "react";
import styles from '../components/Card.module.css';
import { useNavigate } from "react-router-dom";


const Card = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                // alert("Login successful!");
                console.log(data);
                navigate("/result");
            } else {
                alert(data.message || "Login failed");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Server error");
        }
    };
    return (
        <div className={styles.logincard}>
            <div className={styles.login}>
                <h1 className={styles.loginheader}>Enter Details</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.detailField}>
                        <label>Email-Id: </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={styles.detailField}>
                        <label>Password: </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className={styles.submitbtn}>
                        <button className={styles.btn17} type="submit">
                            <span className={styles.textcontainer}>
                                <span className={styles.text}>SUBMIT</span>
                            </span>
                        </button>
                    </div>
                </form>
                </div>
                </div>
                );
}

export default Card;
