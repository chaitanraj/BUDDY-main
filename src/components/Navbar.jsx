import React from "react";
import styles from "./Navbar.module.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import './Hambergermenu'
import Hambergermenu from "./Hambergermenu.jsx";

const Navbar = () => {
    const navigate = useNavigate();
    const [user,setUser]=useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth >= 800);

     useEffect(() => {
          // fetch(`${import.meta.env.VITE_API_URL}/verify-user`,{
            fetch("http://localhost:5000/verify-user", {
                method: "GET",
                credentials: "include",
            })
                .then((res) => {
                    if (!res.ok)
                        throw new Error("Not authenticated")
                    return res.json();
                })
                .then((data) => {
                    setIsAuthenticated(true);
                    setUser(data.name);
                    console.log("Successfull Login")
                })
        }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth >= 800);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        isMobile ? (
            <div className={styles.navbar}>
                <div className={styles.logoItem} onClick={() => navigate("/")}>
                    <img className={styles.img} src="/logonew.png" alt="Let's find you a buddy" />
                    {/* <div className={styles.logoItem}>BUDDY</div> */}
                </div>
                {/* <div className={styles.tagLine}>
                    LET'S FIND YOUR RIDE PARTNER
                </div> */}
                <div className={styles.aTag}>
                    <NavLink to="/inbox" className={styles.navlink}>Inbox</NavLink>
                    <NavLink to="/about" className={styles.navlink}>About</NavLink>
                    <NavLink to="/feedback" className={styles.navlink}>Feedback</NavLink>
                </div>
            </div>
        )
            : (
                <div className={styles.navbar}>
                    <div className={styles.logoItem} onClick={() => navigate("/")}>
                        <img className={styles.img} src="/logonew.png" alt="Let's find you a buddy" />
                        {/* <div className={styles.logoItem}>BUDDY</div> */}
                    </div>
                    <div className={styles.tagLine}>
                        LET'S FIND YOUR RIDE PARTNER
                    </div>
                    <Hambergermenu/>
                </div>
            )
    );
};

export default Navbar;
