import React, { useState, useRef, useEffect } from 'react';
import "./Loginresult.css";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../context/Authcontext';

const Loginresult = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [gender, setGender] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const locationContainerRef = useRef(null);

  const { isLoggedIn, username, login, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationContainerRef.current && !locationContainerRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    // Add event listener when component mounts
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLocationChange = async (e) => {
    const query = e.target.value;
    setLocation(query);

    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&filter=countrycode:in&apiKey=1db3c494724342c787346c1adf082be2`
      );

      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSuggestionClick = (place) => {
    setLocation(place.properties.formatted);
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🧠 Submit clicked");

    const datetime = `${date}T${time}`;

    try {
      //  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/rides/submit-ride`,{
      const res = await fetch("http://localhost:5000/api/rides/submit-ride", {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          name: username,
          gender,
          location,
          datetime
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Submission failed:", data);
        alert(data.message || "Submission failed");
        return;
      }

      navigate("/searchresult", { state: data });
    } catch (err) {
      console.error("❌ Error submitting ride:", err);
      alert("Submission failed");
    }
  };

  return (
    <div className="resultcard">
      <div className="result">
        <h1 className="resultheader">Enter Ride Details</h1>
        <form onSubmit={handleSubmit}>
          <div className="resultfield">
            <label>Name: </label>
            <input value={username} readOnly />
          </div>

          <div className="resultfield" style={{ position: 'relative', zIndex: 2 }} ref={locationContainerRef}>
            <label>Location: </label>
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter your location"
              autoComplete="off"
            />
            {suggestions.length > 0 && (
              <ul
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: 'black',
                  border: '1px solid #ccc',
                  zIndex: 9999,
                  maxHeight: '150px',
                  overflowY: 'auto',
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  borderRadius: '4px',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                }}
              >
                {suggestions.map((place, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSuggestionClick(place)}
                    style={{
                      padding: "8px",
                      cursor: "pointer",
                      borderBottom: "1px solid #444"
                    }}
                  >
                    {place.properties.formatted}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="resultfield">
            <label>Date: </label>
            <input type="date"
              onChange={(e) => {
                setDate(e.target.value)
              }} />
          </div>

          <div className="resultfield">
            <label>Time: </label>
            <input type="time"
              onChange={(e) => {
                setTime(e.target.value)
              }}
            />
          </div>

          <div className="resultgender">
            <label>Gender: </label>
            <div className="resultradiobtn">
              <label>Male </label>
              <input type="radio" name="myGender" value="male"
                checked={gender === "male"}
                onChange={handleGenderChange}
              />
              <label>Female </label>
              <input type="radio" name="myGender" value="female"
                checked={gender === "female"}
                onChange={handleGenderChange}
              />
            </div>
          </div>

          <div className="submitbtn">
            <button type="submit" className="btn17">
              <span className="textcontainer">
                <span className="text">SUBMIT</span>
              </span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Loginresult;