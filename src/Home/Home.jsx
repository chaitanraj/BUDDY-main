import React from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.container1}>
                <div className={styles.body1}>
                    <h1 className={styles.titlebuddy}>BUDDY</h1>
                    <div className={styles.tagwrapper}>

                        <h2 className={styles.heading}>BU DRIVE AND DROP YARD!! </h2>
                    </div>
                    <div className={styles.h3conatiner}>
                        <h3 className={styles.descriptionbuddy}>
                            CONNECTING TRAVELLERS FOR SHARED JOURNEYS <br />
                            AND SMARTER COMMUTES <br />
                            <br></br>
                             SIGN UP and let's get started!

                        </h3>
                    </div>
                </div>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%'
            }} className={styles.optionsbutton}>
                <button onClick={() => navigate("/login")} className={styles.button1}>LOGIN</button>
                <button onClick={() => navigate("/signup")} className={styles.button1}>SIGN-UP</button>
            </div>

        </>
    );
}

export default Home;
