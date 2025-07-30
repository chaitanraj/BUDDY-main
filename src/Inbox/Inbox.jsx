import React, { useEffect, useState } from 'react';
import './Inbox.css';

const Inbox = ({ currentUser }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (!currentUser) return; 

    const fetchInbox = async () => {
      try {
        console.log("🔍 Fetching inbox...");
        const res = await fetch("http://localhost:5000/inbox", {
          method: 'GET', // explicitly set method
          credentials: "include",
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) {
          throw new Error("Failed to fetch inbox");
        }

        const data = await res.json();
        setConversations(data);
      } catch (err) {
        console.error("Inbox fetch error:", err.message);
      }
    };

    fetchInbox();
  }, [currentUser]);

  const handleOpenChat = (conv) => {
    console.log(`Open chat with ${conv.username}`);
  };

  return (
    <div className="inbox-container">
      <h1>Your Inbox</h1>
      {conversations.length === 0 ? (
        <p>No conversations yet.</p>
      ) : (
        <ul className="conversation-list">
          {conversations.map((conv, idx) => (
            <li key={idx} className="conversation-item">
              <div className="conv-header">
                <strong>{conv.username}</strong>
                <span>{new Date(conv.latestTimestamp).toLocaleString()}</span>
              </div>
              <p className="last-message">{conv.latestMessage}</p>
              <button onClick={() => handleOpenChat(conv)}>Open Chat</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Inbox;
