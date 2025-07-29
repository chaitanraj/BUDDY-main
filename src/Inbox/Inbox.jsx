import React, { useEffect, useState } from 'react';
import './Inbox.css';

const Inbox = ({ currentUser }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const res = await fetch(`http://localhost:5000/inbox/${currentUser}`);
        const data = await res.json();
        setConversations(data); // Array of { username, latestMessage, latestTimestamp }
      } catch (error) {
        console.error("Failed to fetch inbox:", error);
      }
    };

    fetchInbox();
  }, [currentUser]);

  const handleOpenChat = (conv) => {
    // You can open a chat modal or navigate to a chat page here
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
