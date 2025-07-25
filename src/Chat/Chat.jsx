import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from './Chat.module.css';

const Chat = () => {
  const { matchId } = useParams();
  const location = useLocation();
  const { user1, user2 } = location.state || {};

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Dummy fetch: In real use, fetch chat history here
  useEffect(() => {
    if (user1 && user2) {
      console.log("Starting chat between:", user1.name, "and", user2.name);
      // fetch messages from server here (later)
    }
  }, [user1, user2]);


  const handleSend = () => {
    if (newMessage.trim() === '') return;

    const messageObj = {
      sender: user1.name,
      text: newMessage,
      time: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, messageObj]);
    setNewMessage('');
  };

  return (
    <div className={styles.chatbody}>
    <div className={styles.chatContainer}>
      <h2 className={styles.chatHeader}>
        Chat with {user2?.name || 'Ride Buddy'}
      </h2>

      <div className={styles.chatBox}>
        {messages.length === 0 ? (
          <p className={styles.noMessages}>No messages yet.</p>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={msg.sender === user1.name ? styles.sent : styles.received}>
              <p className={styles.msgText}>{msg.text}</p>
              <span className={styles.msgTime}>{msg.time}</span>
            </div>
          ))
        )}
      </div>

      <div className={styles.inputSection}>
        <input
          type="text"
          value={newMessage}
          placeholder="Type a message..."
          onChange={(e) => setNewMessage(e.target.value)}
          className={styles.inputBox}
        />
        <button onClick={handleSend} className={styles.sendButton}>Send</button>
      </div>
    </div>
    </div>
  );
};

export default Chat;
