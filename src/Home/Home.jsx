import React from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/Authcontext";

const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const { isLoggedIn, username, login, logout } = useContext(AuthContext);
       console.log("🏠 Home render - isLoggedIn:", isLoggedIn, "username:", username);
    useEffect(() => {
        setIsAuthenticated(isLoggedIn);
        console.log("AuthContext")
    }, [isLoggedIn]);


    const handleLogout = async (e) => {
        logout();
    };

    return (
        <div>
            <div className={styles.container1}>
                <div className={styles.body1}>
                    <h1 className={styles.titlebuddy}>BUDDY</h1>
                    <div className={styles.tagwrapper}>

                        <h2 className={styles.heading}>BU DRIVE AND DROP YARD!! </h2>
                    </div>
                    <div className={styles.h3conatiner}>
                        <h3 className={styles.descriptionbuddy}>
                            CONNECTING TRAVELLERS FOR <br />
                            SHARED JOURNEYS
                            AND SMARTER COMMUTES <br />
                            <br></br>
                        </h3>
                    </div>
                </div>
            </div>
            {isAuthenticated ? (
                <>
                    <div className={styles.welcome1}>
                        Welcome {username}!
                    </div>
                    <div className={styles.optionsbutton}>
                        <button onClick={() => navigate("/result")} className={styles.button1}>Create RIDE!</button>
                        <button onClick={handleLogout} className={styles.button1}>Logout!</button>
                    </div>
                </>
            ) : (
                <>

                    <div className={styles.optionsbutton1}>
                        <button onClick={() => navigate("/login")} className={styles.button2}>LOGIN</button>
                        <button onClick={() => navigate("/signup")} className={styles.button2}>SIGN-UP</button>
                    </div>
                </>

            )}


        </div>
    );
}

export default Home;
