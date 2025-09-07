import React, { useState, useEffect, useContext } from "react";

import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import styles from '../components/Card.module.css';
import { AuthContext } from "../context/Authcontext";

const Card = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const{login}=useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }  
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                console.log("Login successfull: ");
                 login({ name: data.user.name });
                navigate("/");
            } else {
                alert("Login failed");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Server error");
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className={styles.logincard}>
            <div className={styles.login}>
                <h1 className={styles.loginheader}>LOGIN</h1>
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
                        <button className={styles.btn17} type="submit"  disabled={loading}>
                              {loading ? "Logging in..." :
                            <span className={styles.textcontainer}>
                                <span className={styles.text}>SUBMIT</span>
                            </span>
                            }
                        </button>
                    </div>
                    <div className={styles.message}>
                        <p>Don't have an account?</p>
                        <NavLink to="/signup" className={styles.signupinstead}>SIGN UP instead!</NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Card;
