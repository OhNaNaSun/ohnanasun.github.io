import React from 'react';
import { pick } from '../../../helpers';
import { gameStore } from '../../../stores';

import styles from './index.module.css';

function MatchInfo() {
  return (
    <div className={styles.board}>
      <span>Cards not Matched</span>
      <big>{gameStore.unresolvedCardPairs}</big>
    </div>
  );
}

export default MatchInfo;
