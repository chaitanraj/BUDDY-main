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

    const handleSend = () => {
        if (message.trim() === '') return;

        // TODO: Save to backend/inbox

        const from = user1.name;
        const to = user2.name;
        const messageContent =  message ;

        console.log('Message sent:', {
            from,
            to,
            message
        });

        setSent(true);
        messageSend(from, to, message);

        // setTimeout(() => {
        //     onClose();
        // }, 2000);
    };

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    const messageSend=async(from,to,message)=>{
    try{
        console.log({ from, to, message });
         const res = await fetch("http://localhost:5000/inbox", {
            // const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ from, to,message }),
            });
             if (res.ok) {
                console.log("Message sent successfully ");
            } else {
                alert("Inbox rendering failed");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Server error");
        }
    }

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