import React from 'react';

import { pick } from '../../../helpers';
import { gameStore } from '../../../stores';

import styles from './index.module.css';

function Score() {
  const { bestScore } = gameStore;

  return (
    <div className={styles.score}>
      <span>Highest Record</span>
      <big>{bestScore}</big>
    </div>
  );
}

export default Score;
