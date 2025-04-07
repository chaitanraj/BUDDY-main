import React from "react";
import styles from "./Home.module.css"; 
import {useNavigate} from "react-router-dom";

const Home = () => {
     const navigate=useNavigate(); 
    
     return (
      
        <div className={styles.container1}>  
            <div className={styles.body1}>  
                <div className={styles.tagwrapper}>
                <h1 className={styles.heading}>Welcome to BUDDY!!!</h1>
                </div>
                <div className={styles.h3conatiner}>
                <h3 className={styles.descriptionbuddy}>
                    BUDDY is your one-stop destination for finding a cab partner for that lonely ride.
                    Carpooling has never been this easy! <br />
                    Just enter your ride details, and we’ll let you know if or when there’s a partner on the same route as yours. <br />
                    SIGN UP and let's get started!
                </h3>
                </div>
                <div className={styles.optionsbutton}>  
                    <button onClick={()=>navigate("/login")} className={styles.button1}>LOGIN</button>
                    <button onClick={()=>navigate("/signup")} className={styles.button1}>SIGN-UP</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
