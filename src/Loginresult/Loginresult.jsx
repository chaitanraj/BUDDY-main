import React, { useState } from 'react';
import "./Loginresult.css";

const Loginresult = () => {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);

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

  const handleSuggestionClick = (place) => {
    setLocation(place.properties.formatted);
    setSuggestions([]);
  };

  return (
    <div className="resultcard">
      <div className="result">
        <h1 className="resultheader">Enter Details</h1>

        <div className="resultfield">
          <label>Name: </label>
          <input type="text" placeholder="Enter your name" />
        </div>

        <div className="resultfield" style={{ position: 'relative', zIndex: 2 }}>
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
          <input type="date" />
        </div>

        <div className="resultfield">
          <label>Time: </label>
          <input type="time" />
        </div>

        <div className="resultgender">
          <label>Gender: </label>
          <div className="resultradiobtn">
            <label>Male </label>
            <input type="radio" name="myGender" />
            <label>Female </label>
            <input type="radio" name="myGender" />
          </div>
        </div>

        <div className="submitbtn">
          <button className="btn17">
            <span className="textcontainer">
              <span className="text">SUBMIT</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loginresult;
