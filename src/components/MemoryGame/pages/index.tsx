import React from 'react';

import ScoreBoard from './components/ScoreBoard';
import ChessBoard from './components/ChessBoard';
import GameStatusBoard from './components/GameStatusBoard';

import styles from './index.module.css';

export default () => {
  return (
    <div className={styles.memoryGame}>
      <ScoreBoard />
      <ChessBoard />
      <GameStatusBoard />
    </div>
  );
};
