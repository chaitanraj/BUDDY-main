import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import "./profile.css";
import img from "../pics/user.png"
import dropdown from "../pics/dropdown.png"
import Hambergermenu from "./Hambergermenu";
import { AuthContext } from "../context/Authcontext";

const Navbar = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { isLoggedIn, username, login, logout } = useContext(AuthContext);

    useEffect(() => {
        setIsAuthenticated(isLoggedIn);
    }, [isLoggedIn]);

    const [isMobile, setIsMobile] = useState(window.innerWidth >= 800);
    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef(null);

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

    const handleLogout = async (e) => {
        logout();
        navigate("/")
    };

    // Common Profile Component
    const ProfileSection = () => (
        isAuthenticated && (
            <div
                className="profile-container"
                ref={dropdownRef}
                onClick={toggleMenu}
            >
                <div className="profile-name">
                    <img className="usericon" src={img} alt="user" />
                    {username}
                    <img className="usericon" src={dropdown} alt="dropdown" />
                </div>
                <div className={`dropdown-menu2 ${showMenu ? 'show' : ''}`}>
                    <div className="menu-item" onClick={(e) => { e.stopPropagation(); navigate("/result") }}>Create Ride</div>
                    <div className="menu-item" onClick={(e) => { e.stopPropagation(); navigate("/inbox") }}>Inbox</div>
                    <div className="menu-item" onClick={(e) => { e.stopPropagation(); handleLogout(); }}>Logout</div>
                </div>
            </div>
        )
    );

    return (
        isMobile ? (
            <div className={styles.navbar} style={{ overflow: 'visible' }}>
                <div className={styles.logoItem} onClick={() => navigate("/")}>
                    <img className={styles.img} src="/logonew.png" alt="Let's find you a buddy" />
                </div>
                <ProfileSection />
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
                    <ProfileSection />
                    <Hambergermenu />
                </div>
            </>
        )
    );
}

export default Navbar;