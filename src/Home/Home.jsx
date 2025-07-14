import React from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";

const Home = () => {
    const[isAuthenticated,setIsAuthenticated]=useState(false);
    const[user,setUser]= useState(null)
    const navigate = useNavigate();

    useEffect(()=>{
        fetch("http://localhost:5000/api/verify-user",{
        credentials:"include"
        })
        .then((res)=>{
            if(!res.ok)
                throw new Error("Not authenticated")
            return res.json();
        })
        .then((data)=>{
            setIsAuthenticated(true);
            setUser(data.name);
            console.log("Successfull Login")
        })
    },[]);

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
        {!isAuthenticated} ?(
            <div className={styles.optionsbutton}>
                <button onClick={() => navigate("/login")} className={styles.button1}>LOGIN</button>
                <button onClick={() => navigate("/signup")} className={styles.button1}>SIGN-UP</button>
            </div>
        ):(
              <h1>Welcome, BRO</h1>
        )

        </div>
    );
}

export default Home;
