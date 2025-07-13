import React from "react";
import logo from "../pics/logo.png";
import styles from "./Navbar.module.css"; 
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate=useNavigate();
    return (
        <div className={styles.navbar}>
            <div className={styles.logoItem} onClick={()=>navigate("/")}>
                <img className={styles.img} src={logo} alt="Let's find you a buddy" />
                <div className={styles.logoItem}>BUDDY</div>              
            </div>
            <div className={styles.tagLine}>
           LET'S FIND YOUR RIDE PARTNER
           </div>
            <div className={styles.aTag}>
                <NavLink to="/" className={styles.navlink}>Home</NavLink>
                <NavLink to="/about" className={styles.navlink}>About</NavLink>
                <NavLink to="/feedback" className={styles.navlink}>Feedback</NavLink>
            </div>
        </div>
    );
};

export default Navbar;
