import React from "react";
import styles from "./Navbar.module.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import "./profile.css";
import img from "../pics/user.png"
import dropdown from "../pics/dropdown.png"
import Hambergermenu from "./Hambergermenu";

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth >= 800);
    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef(null);

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMenu]);

    const toggleMenu = () => {
        console.log("Toggle menu clicked, current state:", showMenu);
        setShowMenu(prev => !prev);
    };

    const handleLogout = async () => {
        try {
            const res = await fetch("http://localhost:5000/logout", {
                method: "GET",
                credentials: "include",
            });

            if (res.ok) {
                setIsAuthenticated(false);
                setUser(null);
                navigate("/");
                console.log("Logout successful");
            } else {
                console.log("Logout failed");
            }
        } catch (err) {
            console.error("Error during logout:", err);
        }
    };

    return (
        isMobile ? (
            <div className={styles.navbar} style={{overflow: 'visible'}}>
                <div className={styles.logoItem} onClick={() => navigate("/")}>
                    <img className={styles.img} src="/logonew.png" alt="Let's find you a buddy" />
                </div>
                {isAuthenticated && (
                    <div 
                        className="profile-container" 
                        ref={dropdownRef} 
                        onClick={toggleMenu}
                    >
                        <div className="profile-name">
                            <img className="usericon" src={img} alt="user" />
                            {user}
                            <img className="usericon" src={dropdown} alt="dropdown" />
                        </div>
                        <div className={`dropdown-menu2 ${showMenu ? 'show' : ''}`}>
                            <div className="menu-item" onClick={(e) => { e.stopPropagation(); navigate("/result") }}>Create Ride</div>
                            <div className="menu-item" onClick={(e) => { e.stopPropagation(); navigate("/inbox") }}>Inbox</div>
                            <div className="menu-item" onClick={(e) => { e.stopPropagation(); handleLogout(); }}>Logout</div>
                        </div>
                    </div>
                )}
                <div className={styles.aTag}>
                    <NavLink to="/inbox" className={styles.navlink}>Inbox</NavLink>
                    <NavLink to="/about" className={styles.navlink}>About</NavLink>
                    <NavLink to="/feedback" className={styles.navlink}>Feedback</NavLink>
                </div>
            </div>
        ) : (
            <>
            <div className={styles.navbar}>
                <div className={styles.logoItem} onClick={() => navigate("/")}>
                    <img className={styles.img} src="/logonew.png" alt="Let's find you a buddy" />
                </div>   
                <Hambergermenu/>
            </div>
             
                </>
        )
    );
}

export default Navbar;