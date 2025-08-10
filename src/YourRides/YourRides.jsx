import React, { useState, useEffect, useContext } from 'react'
import "./YourRides.css"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext';

const YourRides = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { username } = useContext(AuthContext);

  useEffect(() => {
    const fetchRides = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}api/rides/get-ride`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        })
        const data = await res.json();
        if (res.ok) {
          console.log("Get Ride API hit");
          setRides(data);
        }
        console.log("Saved Ride hit");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, [])

  const handleRideClick = async (rideData) => {
    console.log("🚀 Clicked on ride:", rideData);
    
    try {
      setLoading(true);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}api/rides/submit-ride`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({
          name: username,
          gender: rideData.gender,
          location: rideData.location,
          datetime: rideData.datetime,
          searchOnly: true
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error("❌ Search failed:", data);
        navigate("/searchresult", {
          state: {
            matched: false,
            msg: "Search failed"
          }
        });
        return;
      }

      navigate("/searchresult", { state: data });
      
    } catch (error) {
      console.error("❌ Error searching for matches:", error);
      navigate("/searchresult", {
        state: {
          matched: false,
          msg: "Error searching for matches"
        }
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
return (
  <>
    {rides.length > 0 ? (
      <div className="wrap">
        <div className="container">
          <h1>YOUR RIDES</h1>
          <div className="rideslist">
            {rides.map((item, index) => {
              const dateObj = new Date(item.datetime);
              const date = dateObj.toLocaleDateString();
              const time = dateObj.toLocaleTimeString([], { 
                hour: "2-digit", 
                minute: "2-digit" 
              });

              return (
                <ul
                  key={index}
                  onClick={() => handleRideClick(item)}
                  style={{ cursor: 'pointer' }}
                >
                  <li>{item.location}</li>
                  <li>Date: {date}</li>
                  <li>Time: {time}</li>
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    ) : (
      <div className="container" id="heading">
        <h1>CREATE RIDES TO GET STARTED!</h1>
      </div>
    )}
  </>
);
}

export default YourRides;