import React, { useEffect, useState } from 'react';
import './Inbox.css';

const Inbox = ({ currentUser }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    fetch(`/api/messages/inbox/${currentUser}`)
      .then(res => res.json())
      .then(data => setConversations(data));
  }, [currentUser]);

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
