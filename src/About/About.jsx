import React from 'react'


import "./About.css"
const About = () => {
    return (
        <>
            <div className="headwrap">
                <div className='top'>
                    <div className="card-container">
                        <div className="card">
                            <p>About BUDDY</p>
                        </div>
                    </div>
                    <div className="data">
                        <p> Buddy is a smart, intuitive ride-matching platform designed to simplify how people share rides. Whether you're commuting or planning a long trip, Buddy connects you with matching riders using real-time location data.</p>
                    </div>
                </div>
                {/* Mission  */}
                <div className='top' style={{marginTop:'0vh'}}>
                    <div className="card-container">
                        <div className="card">
                            <p>OUR Mission</p>
                        </div>
                    </div>
                    <div className="data2" >
                        <p>At Buddy, our mission is to make ride-sharing seamless, efficient, and secure. We aim to help users save time, reduce travel costs, and build connections—all while minimizing their environmental impact.
                        </p>
                    </div>
                </div>
                </div>
                {/* Key features */}
                <div className="features">
                <div className='top'>
                    
                    <div className="card-container">
                        <div className="card1">
                            <p>Features</p>
                        </div>
                    </div>
                    <div>
                <div className="featuresdata">
                    <div className="data1">
                        <h3 style={{textDecoration:'underline'}}>🧭 Location-Based Matching</h3>
                        <p>Our intelligent location-based API ensures precise pickup and drop points, making your ride planning effortless.
                        </p>
                    </div>
                    <div className="data1" >
                        <h3 style={{textDecoration:'underline'}}>💬 In-App Messaging</h3>
                        <p>Chat directly with your matched rider using our secure inbox feature—no need to exchange personal contact info.
                        </p>
                    </div>
                    <div className="data1" >
                        <h3 style={{textDecoration:'underline'}}>🚀 Fast & Reliable</h3>
                        <p>Quick ride creation and real-time matching help you get on the road without delay.
                        </p>
                    </div>
                </div>
                    </div>
                </div>
                </div>
            
        </>
    );
}

export default About
