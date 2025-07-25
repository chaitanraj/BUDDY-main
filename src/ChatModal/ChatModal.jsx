import React, { useState, useEffect } from 'react';
import styles from './ChatModal.module.css';

const ChatModal = ({ user1, user2, onClose }) => {
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);
    const [isOpen, setIsOpen] = useState(true); // Start with true since modal is being rendered

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [isOpen]);

    const handleSend = () => {
        if (message.trim() === '') return;

        // TODO: Save to backend/inbox
        console.log('Message sent:', {
            from: user1.name,
            to: user2.name,
            content: message,
        });

        setSent(true);
        setMessage(''); // Clear message after sending
        // Optionally close modal after sending
        // onClose();
    };

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.chatContainer}>
                <h2 className={styles.chatHeader}>
                    Send message to {user2?.name || 'Ride Buddy'}
                </h2>
                
                <div className={styles.inputSection}>
                    <input
                        type="text"
                        value={message}
                        placeholder="Type a message..."
                        onChange={(e) => setMessage(e.target.value)} // Fixed variable name
                        className={styles.inputBox}
                    />
                    <div className={styles.modalButtons}>
                        <button 
                            className={styles.sendButton} 
                            onClick={handleSend}
                        >
                            Send
                        </button>
                        <button 
                            className={styles.cancelBtn} 
                            onClick={handleClose} // Fixed function calls
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatModal;