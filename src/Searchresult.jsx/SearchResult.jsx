import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './SearchResult.module.css';

const SearchResult = () => {
  const location = useLocation();
  const responseData = location.state;
  
  console.log("Location state:", responseData);
  
  const hasMatches = responseData && 
    (Array.isArray(responseData.matches) || responseData.user2);

  if (!hasMatches) {
    return (
      <div className={styles.noMatch}>
        <h2>No rides matched at the moment</h2>
        <p>Your ride details have been saved! We'll notify you when a suitable ride partner is found.</p>
      </div>
    );
  }
  
 
  let matches = [];
  if (Array.isArray(responseData.matches)) {
    matches = responseData.matches;
  } else if (responseData.user2) {
    matches = [{ user: responseData.user2 }];
  } else if (Array.isArray(responseData)) {
   
    matches = responseData;
  }
  
  const userData = responseData.user1 || responseData.userData || {};
  
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        <span role="img" aria-label="celebration">🎉</span> Ride Matched!
      </h2>
      
      <div className={styles.userCards}>
        <div className={styles.yourInfoCard}>
          <h3>
            <span role="img" aria-label="person">👤</span> You
          </h3>
          <div className={styles.userInfo}>
            <p><strong>Name:</strong> {userData.name || "N/A"}</p>
            <p><strong>Location:</strong> {userData.location || "N/A"}</p>
            <p><strong>Date:</strong> {userData.date || "N/A"}</p>
            <p><strong>Time:</strong> {userData.time || "N/A"}</p>
            {userData.gender && (
              <p><strong>Gender:</strong> {userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1)}</p>
            )}
          </div>
        </div>
        {matches.length > 0 && (
          <div className={styles.matchesSection}>
            <h3 className={styles.matchesHeader}>
              {matches.length > 1 
                ? `Your Ride Buddies (${matches.length})` 
                : 'Your Ride Buddy'}
            </h3>
            <div className={styles.matchesGrid}>
              {matches.map((match, index) => {
                const matchData = match.user || match;
                return (
                  <div key={index} className={styles.matchCard}>
                    <h3>
                      <span role="img" aria-label="person">🧍</span> Ride Buddy {matches.length > 1 ? `#${index + 1}` : ''}
                    </h3>
                    <div className={styles.userInfo}>
                      <p><strong>Name:</strong> {matchData.name || "N/A"}</p>
                      <p><strong>Location:</strong> {matchData.location || "N/A"}</p>
                      <p><strong>Date:</strong> {matchData.date || "N/A"}</p>
                      <p><strong>Time:</strong> {matchData.time || "N/A"}</p>
                      {matchData.gender && (
                        <p><strong>Gender:</strong> {matchData.gender.charAt(0).toUpperCase() + matchData.gender.slice(1)}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;