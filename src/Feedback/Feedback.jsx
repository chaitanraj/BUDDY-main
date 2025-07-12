import React from 'react';
import "./Feedback.css"

const Feedback = () => {
    return (
        <>
        <div className="feedbackdiv">
        <div className="subscribe">
            <h1>Feedback</h1>
                <textarea placeholder="Your message" className="subscribe-input" name="email" type="email">
                    </textarea>
                    <br></br>
                        <div className="submit-btn">SUBMIT</div>
        </div>
        </div>
        </>
                
        );
}

 export default Feedback;
