import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useAuth } from '../hooks/useAuth';
// import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import TicTacToe from '../components/TicTacToe/TicTacToe';
import MemoryGame from '../components/MemoryGame/pages/index';
const Home: React.FC = () => {
  const [gameId, setGameId] = useState(1);
  const { logout } = useAuth();
  return (
    <>
      <h2
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '10px',
          justifyContent: 'space-between',
        }}
      >
        welcome
        <span>
          <Button
            onClick={async () => {
              setGameId(gameId === 1 ? 2 : 1);
            }}
            className="right"
            variant="contained"
            color="success"
          >
            chage a game
          </Button>
          <Button
            sx={{ marginLeft: '10px' }}
            onClick={async () => {
              await logout();
            }}
            className="right"
            variant="contained"
            color="success"
          >
            Log out
          </Button>
        </span>
      </h2>
      {gameId === 2 ? (
        <Box
          sx={{
            display: 'flex',
            margin: '0 auto',
            width: '50%',
            alignItems: 'start',
            flexDirection: 'row',
            justifyContent: 'space-around',
            p: 2,
          }}
        >
          <MemoryGame />
        </Box>
      ) : (
        <TicTacToe />
      )}
    </>
  );
};
export default Home;
