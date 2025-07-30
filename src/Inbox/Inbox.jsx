import React, { useEffect, useState } from 'react';
import './Inbox.css';

const Inbox = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const res = await fetch("http://localhost:5000/inbox", {
          method: 'GET',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch inbox: ${res.status}`);
        }

        const data = await res.json();
        console.log("📥 Received inbox data:", data); 
        
        setConversations(data);
        setError(null);
      } catch (err) {
        console.error("❌ Inbox fetch error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInbox();
  }, []);

  const handleOpenChat = (conv) => {
    console.log(`Open chat with ${conv.username}`, conv);
  };

 
  const getLatestMessage = (conversation) => {
    if (!conversation.messages || conversation.messages.length === 0) {
      return "No messages";
    }
    
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    return lastMessage.message;
  };

  if (loading) {
    return <div className="inbox-container"><p>Loading inbox...</p></div>;
  }

  if (error) {
    return (
      <div className="inbox-container">
        <h1>Your Inbox</h1>
        <p style={{color: 'red'}}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="inbox-container">
      <h1>Your Inbox</h1>
      <p>Found {conversations.length} conversations</p>
      {conversations.length === 0 ? (
        <p>No conversations yet.</p>
      ) : (
        <ul className="conversation-list">
          {conversations.map((conv, idx) => (
            <li key={conv.partnerId || idx} className="conversation-item">
              <div className="conv-header">
                <strong>{conv.username}</strong>
                <span>{new Date(conv.latestTimestamp).toLocaleString()}</span>
              </div>
              {/* FIXED: Use getLatestMessage instead of conv.latestMessage */}
              <p className="last-message">{getLatestMessage(conv)}</p>
              <p className="message-count">
                {conv.messages ? conv.messages.length : 0} messages
              </p>
              <button onClick={() => handleOpenChat(conv)}>Open Chat</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Inbox;