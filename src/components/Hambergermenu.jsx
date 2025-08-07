import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Hambergermenu.css';

const Hambergermenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
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
        <div className="hamburger-container">
            <label className="bar" htmlFor="check">
                <input 
                    type="checkbox" 
                    id="check" 
                    checked={isOpen}
                    onChange={toggleMenu}
                />
                <span className="top"></span>
                <span className="middle"></span>
                <span className="bottom"></span>
            </label>
            
            <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                <div className="nav-links">
                    <NavLink 
                        to="/inbox" 
                        className="navlink"
                        onClick={closeMenu}
                    >
                        Inbox
                    </NavLink>
                    <NavLink 
                        to="/about" 
                        className="navlink"
                        onClick={closeMenu}
                    >
                        About
                    </NavLink>
                    <NavLink 
                        onSubmit={handleLogout}
                        className="navlink"
                        onClick={closeMenu}
                    >
                        Logout
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Hambergermenu;