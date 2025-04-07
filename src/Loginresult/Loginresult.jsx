import React from 'react';
import "./Loginresult.css"


const Loginresult = () => {
  return (
   <div className="resultcard">
           <div className="result">
               <h1 className="resultheader">Enter Details</h1>
                <div className="resultfield">
                   <label>Name: </label>
                   <input type="text" placeholder="Enter your name" />
               </div>
               <div className="resultfield">
                   <label>Location: </label>
                   <input type="text" placeholder="Enter your location" />
               </div>
               <div className="resultfield">
                   <label>Date: </label>
                   <input type="date" />
               </div>
               <div className="resultfield">
                   <label>Time: </label>
                   <input type="time" />
               </div>
               <div className="resultgender" >
                   <label>Gender: </label>
                   <div className="resultradiobtn">
                       <label>Male </label>
                       <input type="radio" name="myGender" />
                       <label>Female </label>
                       <input type="radio" name="myGender" />
                   </div>
               </div>       
   
               {/* <div className="resultfield">
                   <label>Email-Id: </label>
                   <input type="email" placeholder="Enter your email" />
               </div>
               <div className="resultfield">
                   <label>Password: </label>
                   <input type="password" />
               </div> */}
               <div className="submitbtn">
                   <button className="btn17">
                       <span className="textcontainer">
                           <span className="text">SUBMIT</span>
                       </span>
                   </button>
               </div>
           </div>
           </div>
  )
}

export default Loginresult
