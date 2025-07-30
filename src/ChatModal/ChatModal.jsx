import React, { useState, useEffect } from 'react';
import styles from './ChatModal.module.css';

const ChatModal = ({ user1, user2, onClose }) => {
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

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

    const messageSend = async (to, message) => {
        try {

            const res = await fetch("http://localhost:5000/inbox", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    to,
                    message,
                }),
            });

            if (res.ok) {
                console.log("✅ Message sent successfully.");
            } else {
                alert("❌ Inbox rendering failed.");
            }
        } catch (err) {
            console.error("❌ Error:", err);
            alert("❌ Server error.");
        }
    };

    const handleSend = () => {
        if (message.trim() === '') return;

        const to = user2._id;

        console.log('Message sent:', {
            to,
            message
        });

        setSent(true);
        messageSend(to, message);
    };

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.chatContainer}>
                {sent ? (
                    <div className={styles.sentContainer}>
                        <p className={styles.sentMessage}>Message sent!</p>
                        <h2>{message}</h2>
                        <button
                            className={styles.cancelBtn}
                            onClick={handleClose}
                        >
                            Okay
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 className={styles.chatHeader}>
                            Send message to {user2?.name || 'Ride Buddy'}
                        </h2>
                        <div className={styles.inputSection}>
                            <input
                                type="text"
                                value={message}
                                placeholder="Type a message..."
                                onChange={(e) => setMessage(e.target.value)}
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
                                    onClick={handleClose}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ChatModal;
