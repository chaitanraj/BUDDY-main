import React, { useEffect, useState } from 'react';
import './Inbox.css';
import { useNavigate } from 'react-router-dom';

const Inbox = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  
    const navigate=useNavigate();

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        // const res = await fetch("http://localhost:5000/inbox", {
         const res = await fetch(`${import.meta.env.VITE_API_URL}/inbox)`, {
          method: 'GET',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!res.ok) {
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
    console.log(`Open chat with ${conv.username} (ID: ${conv.partnerId})`, conv);
    setSelectedChat(conv);
  };

  const handleBackToInbox = () => {
    setSelectedChat(null);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    try {
      console.log('Sending message:', newMessage, 'to:', selectedChat.username);
      
      // API CALL(needed to /send message)
      const updatedConversations = conversations.map(conv => {
        if (conv.partnerId === selectedChat.partnerId) {
          return {
            ...conv,
            messages: [...(conv.messages || []), {
              message: newMessage,
              timestamp: new Date().toISOString(),
              sender: 'you'
            }]
          };
        }
        return conv;
      });
      
      setConversations(updatedConversations);
      setSelectedChat(prev => ({
        ...prev,
        messages: [...(prev.messages || []), {
          message: newMessage,
          timestamp: new Date().toISOString(),
          sender: 'you'
        }]
      }));
      
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };
 
  const getLatestMessage = (conversation) => {
    if (!conversation.messages || conversation.messages.length === 0) {
      return "No messages";
    }
   
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    return lastMessage.message;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    if (messageDate.getTime() === today.getTime()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading inbox...</p>
      </div>
    );
  }

if (error) {
  return (
    <div className="login-container">
      <button onClick={() => navigate("/login")} className="button1">
        LOGIN TO ACCESS INBOX
      </button>
    </div>
  );
}

  // Chat
  if (selectedChat) {
    return (
      <div className="chat-container">
       
        <div className="chat-header">
          <button 
            onClick={handleBackToInbox}
            className="back-button"
          >
            ←
          </button>
          <div className="chat-avatar">
            👤
          </div>
          <div className="chat-user-info">
            <h2 className="chat-username">{selectedChat.username}</h2>
            <p className="chat-message-count">
              {selectedChat.messages?.length || 0} messages
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="messages-container">
          {selectedChat.messages && selectedChat.messages.length > 0 ? (
            selectedChat.messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`message-group ${msg.sender === 'you' ? 'message-sent' : 'message-received'}`}
              >
                <div className={`message-bubble ${msg.sender === 'you' ? 'bubble-sent' : 'bubble-received'}`}>
                  <p className="message-text">{msg.message}</p>
                  <p className="message-time">
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-chat">
              <p>No messages yet. Start the conversation!</p>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="input-container">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="message-input"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`send-button ${!newMessage.trim() ? 'send-disabled' : ''}`}
          >
            ➤
          </button>
        </div>
      </div>
    );
  }

  // Inbox
  return (
    <div className="inbox-container">
      {/* Header */}
      <div className="inbox-header">
        <h1 className="inbox-title">Messages</h1>
        <p className="inbox-subtitle">
          {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Conversations List */}
      <div className="conversations-list">
        {conversations.length === 0 ? (
          <div className="empty-inbox">
            <p>No conversations yet.</p>
          </div>
        ) : (
          conversations.map((conv, idx) => (
            <div 
              key={conv.partnerId || idx} 
              onClick={() => handleOpenChat(conv)}
              className="conversation-item"
            >
              
              <div className="conversation-avatar">
                👤
              </div>
              
              <div className="conversation-content">
                <div className="conversation-header">
                  <h3 className="conversation-username">
                    {conv.username}
                  </h3>
                  <span className="conversation-timestamp">
                    {formatTime(conv.latestTimestamp)}
                  </span>
                </div>
                
                <p className="conversation-last-message">
                  {getLatestMessage(conv)}
                </p>
                
                <div className="conversation-footer">
                  <span className="conversation-message-count">
                    {conv.messages ? conv.messages.length : 0} messages
                  </span>
                  {conv.partnerId && (
                    <span className="conversation-user-id">
                      ID: {conv.partnerId}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Inbox;