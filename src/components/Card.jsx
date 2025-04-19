import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import styles from '../components/Card.module.css';


const Card = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please fill in all fields");      
            return;
          }
          
        try {
         
            const res = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.ok)  {
                let curToken = data.token;
                console.log(curToken)
                    localStorage.setItem('userToken', curToken);
                console.log("Login successfull: ",data);
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
                <h1 className={styles.loginheader}>LOGIN!</h1>
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
