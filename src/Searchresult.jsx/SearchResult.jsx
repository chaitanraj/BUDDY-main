import React from 'react';
import styles from './SearchResult.module.css';

const SearchResult = ({ match }) => {
  if (!match) {
    return (
      <div className={styles.noMatch}>
        <h2>No rides matched at the moment</h2>
      </div>
    );
  }
  else{

  return (
    <div className={styles.resultCard}>
      <h2 className={styles.header}>🎉 Ride Matched!</h2>
      <div className={styles.userDetails}>
        <div className={styles.userBox}>
          <h3>👤 You</h3>
          <p><strong>Name:</strong> {match.user1.name}</p>
          <p><strong>Email:</strong> {match.user1.email}</p>
          <p><strong>Location:</strong> {match.user1.location}</p>
          <p><strong>Date:</strong> {match.user1.date}</p>
          <p><strong>Time:</strong> {match.user1.time}</p>
        </div>

        <div className={styles.userBox}>
          <h3>🧍 Your Ride Buddy</h3>
          <p><strong>Name:</strong> {match.user2.name}</p>
          <p><strong>Email:</strong> {match.user2.email}</p>
          <p><strong>Location:</strong> {match.user2.location}</p>
          <p><strong>Date:</strong> {match.user2.date}</p>
          <p><strong>Time:</strong> {match.user2.time}</p>
        </div>
      </div>
    </div>
  );
  }
};

export default SearchResult;
