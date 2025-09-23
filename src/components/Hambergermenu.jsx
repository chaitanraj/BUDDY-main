import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Hambergermenu.css';

const Hambergermenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate=useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
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
                        className="navlink"
                        onClick={()=>(navigate("/feedback"))}
                    >
                        Feedback
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Hambergermenu;