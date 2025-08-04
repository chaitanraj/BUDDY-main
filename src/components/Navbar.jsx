import React from "react";
import styles from "./Navbar.module.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect,useRef } from "react";
import './Hambergermenu'
import Hambergermenu from "./Hambergermenu.jsx";
import "./profile.css";
import img from "../pics/user.png"
import dropdown from "../pics/dropdown.png"


const Navbar = () => {
    return (
        
            <div className={styles.navbar}>
                <div className={styles.logoItem} onClick={() => navigate("/")}>
                    <img className={styles.img} src="/logonew.png" alt="Let's find you a buddy" />
                </div>
                <div className={styles.aTag}>
                    <NavLink to="/inbox" className={styles.navlink}>Inbox</NavLink>
                    <NavLink to="/about" className={styles.navlink}>About</NavLink>
                    <NavLink to="/feedback" className={styles.navlink}>Feedback</NavLink>
                </div>
            </div>
        )
}

export default Navbar;