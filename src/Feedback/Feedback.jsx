import React, { useState } from 'react';
import "./Feedback.css"
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState("");
    const [saved, setSaved] = useState(false);

    const handleFeedback = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: feedback })
            })
            const data = await res.json();
            if (res.ok) {
                console.log("Message: ", { data });
                setSaved(true);

                setTimeout(() => {
                    setSaved(false);
                    navigate("/");
                }, 2000);

                console.log(saved);
            }
            else {
                console.error("Frontend error");
            }

        }
        catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            {(!saved) ? (
                <div className="feedbackdiv">
                    <form className="subscribe" onSubmit={handleFeedback}>
                        <h1>Help us improve!</h1>
                        <textarea placeholder="Your feedback" className="subscribe-input" value={feedback} required onChange={(e) => setFeedback(e.target.value)}>

                        </textarea>
                        <br></br>
                        <button type="submit" className="submit-btn">SUBMIT</button>
                    </form>
                </div>
            )
                :
                (
                    <div className="feedbackdiv">
                        <div className="subscribe" id="subscribe2">
                            <h1>Thank you for your feedback!</h1>
                            <h5>Redirecting to Homepage....</h5>
                            <button type="submit" className="submit-btn" onClick={() => navigate("/")}>Thank You</button>
                        </div>
                    </div>
                )
            }
        </>

    );
}

export default Feedback;
