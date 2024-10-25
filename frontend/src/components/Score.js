// Score.js
import React from 'react';
import styles from './Score.module.css'; // Import the CSS module

const Score = ({ score }) => {
    return (
        <div className={styles.score}>
            <p>💰 Score: {score}</p>
        </div>
    );
};

export default Score;
